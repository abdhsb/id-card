interface BeanPatternProps {
  color: string;
  opacity?: number;
  id: string;
}

export default function BeanPattern({ color, opacity = 0.12, id }: BeanPatternProps) {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ opacity }}
      aria-hidden="true"
    >
      <defs>
        <pattern id={id} width="72" height="72" patternUnits="userSpaceOnUse" patternTransform="rotate(8)">
          <g fill="none" stroke={color} strokeWidth="1.4">
            <ellipse cx="18" cy="18" rx="13" ry="9" />
            <path d="M8 18c4-6 14-6 18 0" />
            <circle cx="54" cy="50" r="8" />
            <path d="M46 50h16" />
            <path d="M54 42v16" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
