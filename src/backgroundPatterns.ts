export interface BackgroundPatternDef {
  id: string;
  name: string;
}

export const backgroundPatterns: BackgroundPatternDef[] = [
  { id: 'none', name: 'Polos' },
  { id: 'beans', name: 'Biji Kopi' },
  { id: 'cup', name: 'Cangkir Kopi' },
  { id: 'steam', name: 'Uap Kopi' },
  { id: 'leaves', name: 'Daun Kopi' },
  { id: 'sack', name: 'Karung Goni' },
  { id: 'batik', name: 'Batik Kawung' },
  { id: 'dots', name: 'Polkadot' },
  { id: 'diagonal', name: 'Garis Diagonal' },
  { id: 'grid', name: 'Kotak-kotak' },
  { id: 'waves', name: 'Gelombang' },
  { id: 'hex', name: 'Heksagon' },
];

export function getBackgroundPattern(id: string): BackgroundPatternDef {
  return backgroundPatterns.find((p) => p.id === id) ?? backgroundPatterns[1];
}
