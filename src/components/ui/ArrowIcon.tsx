type ArrowIconName =
  | "left"
  | "right"
  | "up"
  | "down"
  | "external"
  | "play"
  | "pause";

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