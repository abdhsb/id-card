import { Crown } from 'lucide-react';
import type { CardData } from '../types';

interface CardLogoProps {
  data: CardData;
  compact?: boolean;
}

export default function CardLogo({ data, compact }: CardLogoProps) {
  const { theme } = data;

  if (data.logoImage) {
    return (
      <div className={`flex items-center justify-center ${compact ? 'h-14' : 'h-20'}`}>
        <img src={data.logoImage} alt={data.companyName} className="max-h-full max-w-[80%] object-contain" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <Crown
        size={compact ? 16 : 20}
        style={{ color: theme.gold }}
        fill={theme.gold}
        strokeWidth={1}
      />
      <div
        className={`${compact ? 'text-2xl' : 'text-[28px]'} leading-none`}
        style={{
          fontFamily: "'Great Vibes', cursive",
          color: theme.gold,
          textShadow: `0 1px 3px rgba(0,0,0,0.5)`,
        }}
      >
        {data.companyName}
      </div>
      {data.companySubtitle && (
        <div className="mt-0.5 flex items-center gap-2">
          <span className="h-px w-4" style={{ background: theme.gold, opacity: 0.6 }} />
          <span
            className="text-[10px] uppercase"
            style={{ color: theme.gold, letterSpacing: '3px', opacity: 0.85 }}
          >
            {data.companySubtitle}
          </span>
          <span className="h-px w-4" style={{ background: theme.gold, opacity: 0.6 }} />
        </div>
      )}
    </div>
  );
}
