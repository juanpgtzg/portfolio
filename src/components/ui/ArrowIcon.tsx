type ArrowIconName =
  | "left"
  | "right"
  | "up"
  | "down"
  | "external"
  | "play"
  | "pause"
  | "volume"
  | "mute";

interface ArrowIconProps {
  name: ArrowIconName;
  className?: string;
}

export default function ArrowIcon({
  name,
  className = "h-3 w-3",
}: ArrowIconProps) {
  if (name === "pause") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className={`fill-current ${className}`}
      >
        <rect x="6" y="5" width="4" height="14" />
        <rect x="14" y="5" width="4" height="14" />
      </svg>
    );
  }

  if (name === "play") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className={`fill-current ${className}`}
      >
        <path d="M8 5v14l11-7Z" />
      </svg>
    );
  }

  if (name === "volume") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className={`fill-none stroke-current ${className}`}
        strokeWidth="1.8"
        strokeLinecap="square"
        strokeLinejoin="miter"
      >
        <path d="M4 10v4h4l5 4V6L8 10H4Z" />
        <path d="M16 9c1.5 1.5 1.5 4.5 0 6" />
        <path d="M18.5 6.5c3 3 3 8 0 11" />
      </svg>
    );
  }

  if (name === "mute") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className={`fill-none stroke-current ${className}`}
        strokeWidth="1.8"
        strokeLinecap="square"
        strokeLinejoin="miter"
      >
        <path d="M4 10v4h4l5 4V6L8 10H4Z" />
        <path d="m16 9 5 6" />
        <path d="m21 9-5 6" />
      </svg>
    );
  }

  const rotation = {
    right: 0,
    down: 90,
    left: 180,
    up: 270,
    external: -45,
  }[name];

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`shrink-0 fill-current ${className}`}
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <path d="M8.5 5 15.5 12l-7 7Z" />
    </svg>
  );
}