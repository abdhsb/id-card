interface BackgroundPatternProps {
  patternId: string;
  color: string;
  opacity?: number;
  id: string;
}

function patternTile(patternId: string, color: string) {
  switch (patternId) {
    case 'beans':
      return {
        size: 72,
        transform: 'rotate(8)',
        content: (
          <g fill="none" stroke={color} strokeWidth={1.4}>
            <ellipse cx={18} cy={18} rx={13} ry={9} />
            <path d="M8 18c4-6 14-6 18 0" />
            <circle cx={54} cy={50} r={8} />
            <path d="M46 50h16" />
            <path d="M54 42v16" />
          </g>
        ),
      };
    case 'dots':
      return {
        size: 26,
        content: (
          <g fill={color}>
            <circle cx={6} cy={6} r={2.4} />
            <circle cx={19} cy={19} r={2.4} />
          </g>
        ),
      };
    case 'diagonal':
      return {
        size: 22,
        content: (
          <path d="M-4 4 L4 -4 M0 22 L22 0 M18 26 L26 18" stroke={color} strokeWidth={2} />
        ),
      };
    case 'grid':
      return {
        size: 28,
        content: <path d="M0 0H28M0 0V28" fill="none" stroke={color} strokeWidth={1.2} />,
      };
    case 'waves':
      return {
        size: 44,
        content: (
          <g fill="none" stroke={color} strokeWidth={1.6}>
            <path d="M0 12c6-8 16-8 22 0s16 8 22 0" />
            <path d="M0 34c6-8 16-8 22 0s16 8 22 0" />
          </g>
        ),
      };
    case 'hex':
      return {
        size: 34,
        content: (
          <path d="M17 2 L30 9.5 L30 24.5 L17 32 L4 24.5 L4 9.5 Z" fill="none" stroke={color} strokeWidth={1.3} />
        ),
      };
    case 'none':
    default:
      return null;
  }
}

export default function BackgroundPattern({ patternId, color, opacity = 0.12, id }: BackgroundPatternProps) {
  const tile = patternTile(patternId, color);
  if (!tile) return null;

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ opacity }}
      aria-hidden="true"
    >
      <defs>
        <pattern
          id={id}
          width={tile.size}
          height={tile.size}
          patternUnits="userSpaceOnUse"
          patternTransform={tile.transform}
        >
          {tile.content}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
