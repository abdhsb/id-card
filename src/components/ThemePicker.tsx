import { Check } from 'lucide-react';
import { themes } from '../themes';
import type { CardTheme } from '../types';

interface Props {
  value: CardTheme;
  onChange: (theme: CardTheme) => void;
}

export default function ThemePicker({ value, onChange }: Props) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-neutral-500">
        Warna Tema
      </label>
      <div className="flex flex-wrap gap-2.5">
        {themes.map((theme) => (
          <button
            key={theme.id}
            type="button"
            title={theme.name}
            onClick={() => onChange(theme)}
            className="relative h-9 w-9 rounded-full ring-offset-2 focus:outline-none"
            style={{
              background: `linear-gradient(135deg, ${theme.accentSoft}, ${theme.accent} 60%, ${theme.dark})`,
              boxShadow: value.id === theme.id ? `0 0 0 2px white, 0 0 0 4px ${theme.accent}` : undefined,
            }}
          >
            {value.id === theme.id && (
              <Check size={16} className="absolute inset-0 m-auto text-white drop-shadow" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
