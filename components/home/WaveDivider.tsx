type WaveDividerProps = {
  fill: string;
  className?: string;
  position?: "relative" | "absolute";
};

export default function WaveDivider({
  fill,
  className,
  position = "relative",
}: WaveDividerProps) {
  return (
    <div
      className={`${position} z-10 h-16 w-full overflow-hidden ${className ?? ""}`}
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 250"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,145 C220,285 380,12 720,145 C1060,278 1220,12 1440,145 L1440,250 L0,250 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}
