"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";

interface AudioEngine {
  getAnalyser: () => AnalyserNode | null;
  registerMediaElement: (element: HTMLMediaElement | null) => void;
  playUiClick: () => Promise<void>;
  resumeAudio: () => Promise<void>;
}

const AudioContextValue = createContext<AudioEngine | null>(null);

export function AudioProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  const mediaSourcesRef = useRef(
    new WeakMap<HTMLMediaElement, MediaElementAudioSourceNode>()
  );

  const ensureEngine = useCallback(() => {
    if (!audioContextRef.current) {
      const context = new AudioContext();

      const analyser = context.createAnalyser();

      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = 0.78;

      analyser.connect(context.destination);

      audioContextRef.current = context;
      analyserRef.current = analyser;
    }

    return {
      context: audioContextRef.current,
      analyser: analyserRef.current,
    };
  }, []);

  const resumeAudio = useCallback(async () => {
    const { context } = ensureEngine();

    if (!context) return;

    if (context.state === "suspended") {
      await context.resume();
    }
  }, [ensureEngine]);

  const playUiClick = useCallback(async () => {
    const { context, analyser } = ensureEngine();

    if (!context || !analyser) return;

    if (context.state === "suspended") {
      await context.resume();
    }

    const now = context.currentTime;

    const bufferLength = Math.floor(
      context.sampleRate * 0.035
    );

    const buffer = context.createBuffer(
      1,
      bufferLength,
      context.sampleRate
    );

    const samples = buffer.getChannelData(0);

    for (let i = 0; i < bufferLength; i++) {
      const decay = 1 - i / bufferLength;

      samples[i] =
        (Math.random() * 2 - 1) *
        decay *
        decay;
    }

    const source = context.createBufferSource();
    const filter = context.createBiquadFilter();
    const gain = context.createGain();

    source.buffer = buffer;

    filter.type = "bandpass";
    filter.frequency.value = 1800;
    filter.Q.value = 0.8;

    gain.gain.setValueAtTime(0.045, now);

    gain.gain.exponentialRampToValueAtTime(
      0.0001,
      now + 0.04
    );

    source
      .connect(filter)
      .connect(gain)
      .connect(analyser);

    source.start(now);
  }, [ensureEngine]);

  const registerMediaElement = useCallback(
    (element: HTMLMediaElement | null) => {
      if (!element) return;

      if (mediaSourcesRef.current.has(element)) {
        return;
      }

      const { context, analyser } = ensureEngine();

      if (!context || !analyser) return;

      const source =
        context.createMediaElementSource(element);

      source.connect(analyser);

      mediaSourcesRef.current.set(element, source);
    },
    [ensureEngine]
  );

  const getAnalyser = useCallback(() => {
    return analyserRef.current;
  }, []);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Element | null;

      const control = target?.closest(
        "button, a[href], [role='button']"
      );

      if (!control) return;

      if (control.hasAttribute("data-ui-sound-off")) {
        return;
      }

      void playUiClick();
    };

    document.addEventListener(
      "pointerdown",
      handlePointerDown,
      true
    );

    return () => {
      document.removeEventListener(
        "pointerdown",
        handlePointerDown,
        true
      );
    };
  }, [playUiClick]);

  return (
    <AudioContextValue.Provider
      value={{
        getAnalyser,
        registerMediaElement,
        playUiClick,
        resumeAudio,
      }}
    >
      {children}
    </AudioContextValue.Provider>
  );
}

export function useAudioEngine() {
  const context = useContext(AudioContextValue);

  if (!context) {
    throw new Error(
      "useAudioEngine must be used inside AudioProvider"
    );
  }

  return context;
}