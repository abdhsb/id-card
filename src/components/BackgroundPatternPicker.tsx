import { backgroundPatterns } from '../backgroundPatterns';
import BackgroundPattern from './BackgroundPattern';

interface Props {
  value: string;
  color: string;
  onChange: (patternId: string) => void;
}

export default function BackgroundPatternPicker({ value, color, onChange }: Props) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-neutral-500">
        Motif Background
      </label>
      <div className="grid grid-cols-4 gap-2">
        {backgroundPatterns.map((pattern) => (
          <button
            key={pattern.id}
            type="button"
            title={pattern.name}
            onClick={() => onChange(pattern.id)}
            className={`relative h-12 overflow-hidden rounded-md border bg-neutral-900 ${
              value === pattern.id ? 'border-neutral-900 ring-2 ring-neutral-900 ring-offset-1' : 'border-neutral-200'
            }`}
          >
            <BackgroundPattern id={`swatch-${pattern.id}`} patternId={pattern.id} color={color} opacity={0.9} />
          </button>
        ))}
      </div>
      <p className="mt-1.5 text-[11px] text-neutral-400">
        {backgroundPatterns.find((p) => p.id === value)?.name}
      </p>
    </div>
  );
}
