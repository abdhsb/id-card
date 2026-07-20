import { forwardRef, type ReactNode } from 'react';
import type { CardTheme } from '../types';

interface CardFrameProps {
  theme: CardTheme;
  children: ReactNode;
}

const CardFrame = forwardRef<HTMLDivElement, CardFrameProps>(function CardFrame(
  { theme, children },
  ref,
) {
  return (
    <div
      ref={ref}
      className="relative h-[540px] w-[336px] shrink-0 overflow-hidden rounded-[26px] shadow-xl"
      style={{
        background: `linear-gradient(160deg, ${theme.accentSoft} 0%, ${theme.accent} 16%, ${theme.dark} 46%, ${theme.dark} 100%)`,
      }}
    >
      <div
        className="absolute inset-[3px] overflow-hidden rounded-[24px]"
        style={{ background: theme.dark }}
      >
        <div
          className="absolute inset-x-0 top-0 h-2"
          style={{ background: `linear-gradient(90deg, ${theme.accent}, ${theme.accentSoft}, ${theme.accent})` }}
        />
        <div
          className="absolute bottom-0 left-0 top-0 w-[6px]"
          style={{ background: `linear-gradient(180deg, ${theme.accentSoft}, ${theme.accent} 35%, transparent 78%)` }}
        />
        <div
          className="absolute bottom-0 right-0 top-0 w-[6px]"
          style={{ background: `linear-gradient(180deg, ${theme.accentSoft}, ${theme.accent} 35%, transparent 78%)` }}
        />
        <div className="absolute left-1/2 top-2 z-20 h-3 w-3 -translate-x-1/2 rounded-full bg-neutral-900/70 shadow-inner" />
        {children}
      </div>
    </div>
  );
});

export default CardFrame;
