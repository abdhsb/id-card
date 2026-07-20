import type { ReactNode } from 'react';

interface Props {
  title: string;
  children: ReactNode;
}

export default function Section({ title, children }: Props) {
  return (
    <div className="border-b border-neutral-200 py-5 first:pt-0 last:border-b-0">
      <h3 className="mb-3 text-sm font-bold text-neutral-800">{title}</h3>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}
