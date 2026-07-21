import { forwardRef } from 'react';
import { User } from 'lucide-react';
import type { CardData } from '../types';
import CardFrame from './CardFrame';
import CardLogo from './CardLogo';
import BackgroundPattern from './BackgroundPattern';

interface Props {
  data: CardData;
}

const IdCardFront = forwardRef<HTMLDivElement, Props>(function IdCardFront({ data }, ref) {
  const { theme } = data;

  return (
    <CardFrame theme={theme} ref={ref}>
      <div className="relative flex h-full flex-col items-center pb-0 pt-6">
        <BackgroundPattern
          id="front-pattern"
          patternId={data.backgroundPattern}
          color={theme.accent}
          opacity={0.22}
        />

        <div className="relative z-10">
          <CardLogo data={data} />
        </div>

        <div
          className="relative z-10 mt-5 h-[168px] w-[168px] overflow-hidden rounded-2xl"
          style={{
            border: `3px solid ${theme.accent}`,
            boxShadow: `0 0 0 1px rgba(0,0,0,0.4), inset 0 0 20px rgba(0,0,0,0.4)`,
            background: theme.darkSoft,
          }}
        >
          {data.photo ? (
            <img src={data.photo} alt={data.employeeName} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <User size={64} style={{ color: theme.accent, opacity: 0.5 }} />
            </div>
          )}
        </div>

        <div className="relative z-10 mt-4 px-4 text-center">
          <div
            className="text-[20px] font-extrabold uppercase italic leading-[1.05]"
            style={{ color: theme.accentSoft, letterSpacing: '0.5px', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
          >
            {data.roleTitle}
          </div>
        </div>

        <div className="relative z-10 mt-2 px-3 text-center">
          <div className="text-[19px] font-bold uppercase tracking-wide text-white">
            {data.employeeName}
          </div>
        </div>

        <div
          className="relative z-10 mt-auto w-full px-4 py-3 text-center"
          style={{ background: `linear-gradient(90deg, ${theme.accent}, ${theme.accentSoft})` }}
        >
          <div className="text-[14px] font-extrabold uppercase leading-tight text-white" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.35)' }}>
            {data.footerCompany}
          </div>
          <div className="mt-0.5 text-[11px] font-semibold uppercase leading-tight text-white/90">
            {data.footerTagline}
          </div>
          <div className="mt-0.5 text-[9px] uppercase leading-tight text-white/80" style={{ letterSpacing: '0.5px' }}>
            {data.footerAddress}
          </div>
        </div>
      </div>
    </CardFrame>
  );
});

export default IdCardFront;
