import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function BadgeMockup({ children }: Props) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative z-10 h-10 w-14 rounded-t-md bg-neutral-800 print:hidden">
        <div className="absolute inset-x-2 top-1.5 h-2 rounded-full bg-gradient-to-b from-yellow-300 to-yellow-600" />
      </div>
      <div className="-mt-1 h-4 w-4 rounded-full border-4 border-neutral-300 bg-neutral-500 print:hidden" />
      {children}
    </div>
  );
}
