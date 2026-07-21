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
        size: 56,
        transform: 'rotate(8)',
        content: (
          <g fill="none" stroke={color} strokeWidth={1.4}>
            <ellipse cx={14} cy={14} rx={10} ry={7} />
            <path d="M6 14c3-5 11-5 14 0" />
            <circle cx={42} cy={39} r={6.5} />
            <path d="M35.5 39h13" />
            <path d="M42 32.5v13" />
          </g>
        ),
      };
    case 'cup':
      return {
        size: 46,
        transform: 'rotate(-6)',
        content: (
          <g fill="none" stroke={color} strokeWidth={1.3}>
            <path d="M6 12h16v9a5 5 0 01-5 5h-6a5 5 0 01-5-5v-9z" />
            <path d="M22 14h3.5a3.5 3.5 0 010 7H22" />
            <path d="M10 4c0 1.6 2.2 1.6 2.2 3.2M15.5 4c0 1.6 2.2 1.6 2.2 3.2" />
          </g>
        ),
      };
    case 'steam':
      return {
        size: 30,
        content: (
          <g fill="none" stroke={color} strokeWidth={1.5}>
            <path d="M8 1c-3 3 3 5.5 0 8.5S11 15 8 18" />
            <path d="M21 1c-3 3 3 5.5 0 8.5S24 15 21 18" />
          </g>
        ),
      };
    case 'leaves':
      return {
        size: 42,
        transform: 'rotate(12)',
        content: (
          <g fill="none" stroke={color} strokeWidth={1.3}>
            <path d="M14 3c8 2.5 8 15.5 0 17.5-8-2-8-15 0-17.5z" />
            <path d="M14 3.5v17" />
          </g>
        ),
      };
    case 'sack':
      return {
        size: 18,
        content: <path d="M0 0L18 18M18 0L0 18" stroke={color} strokeWidth={1} />,
      };
    case 'batik':
      return {
        size: 32,
        content: (
          <g fill="none" stroke={color} strokeWidth={1.1}>
            <ellipse cx={16} cy={7} rx={5} ry={7.5} />
            <ellipse cx={16} cy={25} rx={5} ry={7.5} />
            <ellipse cx={7} cy={16} rx={7.5} ry={5} />
            <ellipse cx={25} cy={16} rx={7.5} ry={5} />
            <circle cx={16} cy={16} r={2.2} />
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
