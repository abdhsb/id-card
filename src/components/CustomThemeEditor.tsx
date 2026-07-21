import { lightenHex } from '../lib/color';
import type { CardTheme } from '../types';

interface Props {
  theme: CardTheme;
  onChange: (theme: CardTheme) => void;
}

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-2 text-xs text-neutral-600">
      <span>{label}</span>
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-7 w-14 cursor-pointer rounded border border-neutral-300 bg-transparent p-0.5"
      />
    </label>
  );
}

export default function CustomThemeEditor({ theme, onChange }: Props) {
  const update = (patch: Partial<CardTheme>) => {
    onChange({ ...theme, ...patch, id: 'custom', name: 'Kustom' });
  };

  return (
    <div className="mt-2 flex flex-col gap-2 rounded-lg border border-neutral-200 bg-neutral-50 p-3">
      <ColorField label="Gradasi Terang" value={theme.accentSoft} onChange={(v) => update({ accentSoft: v })} />
      <ColorField label="Gradasi Gelap" value={theme.accent} onChange={(v) => update({ accent: v })} />
      <ColorField
        label="Latar Kartu"
        value={theme.dark}
        onChange={(v) => update({ dark: v, darkSoft: lightenHex(v, 0.08) })}
      />
      <ColorField label="Aksen Emas / Teks" value={theme.gold} onChange={(v) => update({ gold: v })} />
    </div>
  );
}
