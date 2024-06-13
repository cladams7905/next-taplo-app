interface LoadingDotsProps {
  color?: string;
  size?: "sm" | "md" | "lg";
}

export default function LoadingDots({ color, size = "md" }: LoadingDotsProps) {
  const sizeClass =
    size === "sm"
      ? "loading-sm"
      : size === "md"
      ? "loading-md"
      : size === "lg"
      ? "loading-lg"
      : "loading-md";

  return (
    <span
      className={`loading loading-dots ${sizeClass}`}
      style={{ color }}
    ></span>
  );
}
