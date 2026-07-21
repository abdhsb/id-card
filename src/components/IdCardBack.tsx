import { forwardRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Sparkles } from 'lucide-react';
import type { CardData } from '../types';
import CardFrame from './CardFrame';
import CardLogo from './CardLogo';
import BackgroundPattern from './BackgroundPattern';

interface Props {
  data: CardData;
}

const IdCardBack = forwardRef<HTMLDivElement, Props>(function IdCardBack({ data }, ref) {
  const { theme } = data;

  return (
    <CardFrame theme={theme} ref={ref}>
      <div className="relative flex h-full flex-col items-center px-5 pb-5 pt-6">
        <BackgroundPattern
          id="back-pattern"
          patternId={data.backgroundPattern}
          color={theme.accent}
          opacity={0.1}
        />

        <div className="relative z-10">
          <CardLogo data={data} compact />
        </div>

        <div
          className="relative z-10 mt-5 w-full rounded-xl px-4 py-4 text-center"
          style={{ border: `1.5px solid ${theme.accent}` }}
        >
          <div
            className="text-[11px] font-bold uppercase"
            style={{ color: theme.gold, letterSpacing: '2px' }}
          >
            {data.authTitle}
          </div>

          <div className="mx-auto mt-3 w-fit rounded-lg bg-white p-2.5">
            <QRCodeSVG value={data.qrValue || data.employeeId || 'id-card'} size={128} level="M" />
          </div>

          <div
            className="mt-3 text-[10px] font-semibold uppercase"
            style={{ color: theme.gold, letterSpacing: '1.5px', opacity: 0.9 }}
          >
            {data.employeeIdLabel}
          </div>
          <div className="text-[18px] font-extrabold tracking-wide text-white">{data.employeeId}</div>
        </div>

        <div className="relative z-10 mt-4 text-center text-[12px] leading-relaxed text-white/90">
          <div>
            <span className="font-semibold" style={{ color: theme.gold }}>
              {data.accessZonesLabel}:{' '}
            </span>
            <span className="font-bold text-white">{data.accessZones}</span>
          </div>
          <div>
            <span className="font-semibold" style={{ color: theme.gold }}>
              {data.validUntilLabel}:{' '}
            </span>
            <span className="font-bold text-white">{data.validUntil}</span>
          </div>
        </div>

        <div
          className="relative z-10 mt-4 w-full rounded-xl px-4 py-3 text-center"
          style={{ border: `1.5px solid ${theme.accent}` }}
        >
          <div
            className="text-[10px] font-semibold uppercase"
            style={{ color: theme.gold, letterSpacing: '1.5px' }}
          >
            {data.emergencyLabel}:
          </div>
          <div className="mt-1 text-[16px] font-extrabold text-white">{data.emergencyPhone}</div>
        </div>

        <div className="relative z-10 mt-auto flex flex-col items-center gap-1 pt-4 text-center">
          <span
            className="w-full text-[7.5px] font-semibold uppercase leading-snug"
            style={{ color: theme.gold, letterSpacing: '0.5px', opacity: 0.75 }}
          >
            {data.footerNote}
          </span>
          <Sparkles size={9} style={{ color: theme.gold, opacity: 0.75 }} />
        </div>
      </div>
    </CardFrame>
  );
});

export default IdCardBack;
