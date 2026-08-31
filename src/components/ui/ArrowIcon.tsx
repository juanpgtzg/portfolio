interface ArrowIconProps {
  direction: "left" | "right" | "up" | "down";
  className?: string;
}

export default function ArrowIcon({
  direction,
  className = "h-3 w-3",
}: ArrowIconProps) {
  const rotation = {
    right: "rotate(0deg)",
    down: "rotate(90deg)",
    left: "rotate(180deg)",
    up: "rotate(270deg)",
  }[direction];

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`fill-current ${className}`}
      style={{ transform: rotation }}
    >
      <path d="M8.5 5 15.5 12l-7 7Z" />
    </svg>
  );
}