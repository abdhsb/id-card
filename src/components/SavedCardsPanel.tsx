import { useEffect, useState } from 'react';
import { Save, RefreshCw, Trash2, FolderOpen, CloudOff, AlertCircle } from 'lucide-react';
import type { CardData } from '../types';
import { isSupabaseConfigured } from '../lib/supabase';
import { deleteCard, listCards, saveCard, type SavedCard } from '../lib/cardStorage';
import { getErrorMessage } from '../lib/errorMessage';

interface Props {
  data: CardData;
  activeId: string | null;
  onLoad: (id: string, data: CardData) => void;
}

export default function SavedCardsPanel({ data, activeId, onLoad }: Props) {
  const [cards, setCards] = useState<SavedCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = async () => {
    if (!isSupabaseConfigured) return;
    setLoading(true);
    setError(null);
    try {
      setCards(await listCards());
    } catch (err) {
      setError(getErrorMessage(err, 'Gagal memuat data'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const saved = await saveCard(data, activeId ?? undefined);
      onLoad(saved.id, saved.data);
      await refresh();
    } catch (err) {
      setError(getErrorMessage(err, 'Gagal menyimpan kartu'));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    if (!confirm('Hapus kartu ini dari database?')) return;
    setError(null);
    try {
      await deleteCard(id);
      await refresh();
    } catch (err) {
      setError(getErrorMessage(err, 'Gagal menghapus kartu'));
    }
  };

  if (!isSupabaseConfigured) {
    return (
      <div className="border-b border-neutral-200 py-5">
        <h3 className="mb-2 flex items-center gap-1.5 text-sm font-bold text-neutral-800">
          <CloudOff size={15} /> Database Supabase
        </h3>
        <p className="text-xs leading-relaxed text-neutral-500">
          Belum terhubung. Isi <code className="rounded bg-neutral-100 px-1 py-0.5">VITE_SUPABASE_URL</code> dan{' '}
          <code className="rounded bg-neutral-100 px-1 py-0.5">VITE_SUPABASE_ANON_KEY</code> di file{' '}
          <code className="rounded bg-neutral-100 px-1 py-0.5">.env</code>, lalu jalankan ulang{' '}
          <code className="rounded bg-neutral-100 px-1 py-0.5">npm run dev</code>. Lihat{' '}
          <code className="rounded bg-neutral-100 px-1 py-0.5">supabase/migration.sql</code> untuk skema tabelnya.
        </p>
      </div>
    );
  }

  return (
    <div className="border-b border-neutral-200 py-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-bold text-neutral-800">Kartu Tersimpan</h3>
        <button
          type="button"
          onClick={refresh}
          disabled={loading}
          className="text-neutral-400 hover:text-neutral-700 disabled:opacity-50"
          title="Muat ulang"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      <button
        type="button"
        onClick={handleSave}
        disabled={saving}
        className="mb-3 flex w-full items-center justify-center gap-1.5 rounded-md bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-60"
      >
        <Save size={15} /> {saving ? 'Menyimpan...' : activeId ? 'Simpan Perubahan' : 'Simpan Kartu Baru'}
      </button>

      {error && (
        <div className="mb-3 flex items-start gap-1.5 rounded-md bg-red-50 px-2.5 py-2 text-xs text-red-700">
          <AlertCircle size={14} className="mt-0.5 shrink-0" /> {error}
        </div>
      )}

      {cards.length === 0 && !loading ? (
        <p className="text-xs text-neutral-400">Belum ada kartu tersimpan.</p>
      ) : (
        <ul className="flex flex-col gap-1.5">
          {cards.map((card) => (
            <li key={card.id}>
              <button
                type="button"
                onClick={() => onLoad(card.id, card.data)}
                className={`flex w-full items-center gap-2.5 rounded-md border px-2.5 py-2 text-left text-xs hover:border-neutral-400 ${
                  activeId === card.id ? 'border-neutral-800 bg-neutral-50' : 'border-neutral-200'
                }`}
              >
                <div
                  className="h-7 w-7 shrink-0 overflow-hidden rounded-full"
                  style={{ background: card.data.theme.dark, border: `1.5px solid ${card.data.theme.accent}` }}
                >
                  {card.data.photo && (
                    <img src={card.data.photo} alt="" className="h-full w-full object-cover" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-semibold text-neutral-800">
                    {card.data.employeeName || 'Tanpa nama'}
                  </div>
                  <div className="truncate text-neutral-400">{card.data.companyName}</div>
                </div>
                <FolderOpen size={13} className="shrink-0 text-neutral-300" />
                <button
                  type="button"
                  onClick={(e) => handleDelete(card.id, e)}
                  className="shrink-0 text-neutral-300 hover:text-red-500"
                  title="Hapus"
                >
                  <Trash2 size={13} />
                </button>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
