import { useRef, useState } from 'react';
import { Download, Printer, RotateCcw, IdCard } from 'lucide-react';
import Editor from './components/Editor';
import IdCardFront from './components/IdCardFront';
import IdCardBack from './components/IdCardBack';
import BadgeMockup from './components/BadgeMockup';
import { defaultData } from './defaultData';
import type { CardData } from './types';
import { exportNodeAsPng } from './exportImage';

function App() {
  const [data, setData] = useState<CardData>(defaultData);
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState<string | null>(null);

  const fileBase = data.employeeName.trim().replace(/\s+/g, '-').toLowerCase() || 'id-card';

  const downloadFront = async () => {
    if (!frontRef.current) return;
    setBusy('front');
    try {
      await exportNodeAsPng(frontRef.current, `${fileBase}-depan.png`);
    } finally {
      setBusy(null);
    }
  };

  const downloadBack = async () => {
    if (!backRef.current) return;
    setBusy('back');
    try {
      await exportNodeAsPng(backRef.current, `${fileBase}-belakang.png`);
    } finally {
      setBusy(null);
    }
  };

  const downloadBoth = async () => {
    setBusy('both');
    try {
      if (frontRef.current) await exportNodeAsPng(frontRef.current, `${fileBase}-depan.png`);
      if (backRef.current) await exportNodeAsPng(backRef.current, `${fileBase}-belakang.png`);
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col bg-neutral-100">
      <header className="flex shrink-0 items-center justify-between border-b border-neutral-200 bg-white px-6 py-3">
        <div className="flex items-center gap-2">
          <IdCard className="text-neutral-800" size={22} />
          <h1 className="text-lg font-bold text-neutral-900">ID Card Maker</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setData(defaultData)}
            className="flex items-center gap-1.5 rounded-md border border-neutral-300 px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
          >
            <RotateCcw size={15} /> Reset
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 rounded-md border border-neutral-300 px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
          >
            <Printer size={15} /> Cetak
          </button>
          <button
            onClick={downloadBoth}
            disabled={busy !== null}
            className="flex items-center gap-1.5 rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700 disabled:opacity-60"
          >
            <Download size={15} /> {busy === 'both' ? 'Mengunduh...' : 'Unduh Depan & Belakang'}
          </button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        <aside className="card-scrollbar w-[380px] shrink-0 overflow-y-auto border-r border-neutral-200 bg-white px-5 py-4">
          <Editor data={data} onChange={setData} />
        </aside>

        <main className="card-scrollbar flex flex-1 flex-col items-center justify-center gap-8 overflow-auto px-6 py-10">
          <div id="print-area" className="flex flex-wrap items-start justify-center gap-14">
            <div className="flex flex-col items-center gap-3">
              <BadgeMockup>
                <IdCardFront data={data} ref={frontRef} />
              </BadgeMockup>
              <button
                onClick={downloadFront}
                disabled={busy !== null}
                className="flex items-center gap-1.5 rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-50 disabled:opacity-60 print:hidden"
              >
                <Download size={13} /> {busy === 'front' ? 'Mengunduh...' : 'Unduh Depan'}
              </button>
            </div>

            <div className="flex flex-col items-center gap-3">
              <BadgeMockup>
                <IdCardBack data={data} ref={backRef} />
              </BadgeMockup>
              <button
                onClick={downloadBack}
                disabled={busy !== null}
                className="flex items-center gap-1.5 rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-50 disabled:opacity-60 print:hidden"
              >
                <Download size={13} /> {busy === 'back' ? 'Mengunduh...' : 'Unduh Belakang'}
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
