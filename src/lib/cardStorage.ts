import { ASSET_BUCKET, supabase } from './supabase';
import { themes } from '../themes';
import type { CardData } from '../types';

export interface SavedCard {
  id: string;
  updatedAt: string;
  data: CardData;
}

function dataUrlToBlob(dataUrl: string): Blob {
  const [meta, base64] = dataUrl.split(',');
  const mime = meta.match(/data:(.*);base64/)?.[1] ?? 'image/png';
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new Blob([bytes], { type: mime });
}

function extForMime(mime: string): string {
  if (mime.includes('jpeg')) return 'jpg';
  if (mime.includes('png')) return 'png';
  if (mime.includes('webp')) return 'webp';
  if (mime.includes('svg')) return 'svg';
  return 'png';
}

async function uploadAsset(value: string | null, folder: string): Promise<string | null> {
  if (!value) return null;
  if (!value.startsWith('data:')) return value;
  if (!supabase) throw new Error('Supabase belum dikonfigurasi');

  const blob = dataUrlToBlob(value);
  const path = `${folder}/${crypto.randomUUID()}.${extForMime(blob.type)}`;
  const { error } = await supabase.storage.from(ASSET_BUCKET).upload(path, blob, {
    contentType: blob.type,
    upsert: false,
  });
  if (error) throw error;

  const { data } = supabase.storage.from(ASSET_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

function cardDataToRow(data: CardData, photoUrl: string | null, logoUrl: string | null) {
  return {
    theme_id: data.theme.id,
    theme_name: data.theme.name,
    theme_dark: data.theme.dark,
    theme_dark_soft: data.theme.darkSoft,
    theme_accent: data.theme.accent,
    theme_accent_soft: data.theme.accentSoft,
    theme_gold: data.theme.gold,
    logo_url: logoUrl,
    company_name: data.companyName,
    company_subtitle: data.companySubtitle,
    role_title: data.roleTitle,
    employee_name: data.employeeName,
    photo_url: photoUrl,
    footer_company: data.footerCompany,
    footer_tagline: data.footerTagline,
    footer_address: data.footerAddress,
    auth_title: data.authTitle,
    employee_id_label: data.employeeIdLabel,
    employee_id: data.employeeId,
    access_zones_label: data.accessZonesLabel,
    access_zones: data.accessZones,
    valid_until_label: data.validUntilLabel,
    valid_until: data.validUntil,
    emergency_label: data.emergencyLabel,
    emergency_phone: data.emergencyPhone,
    footer_note: data.footerNote,
    qr_value: data.qrValue,
    background_pattern: data.backgroundPattern,
  };
}

interface IdCardRow {
  logo_url: string | null;
  company_name: string;
  company_subtitle: string;
  role_title: string;
  employee_name: string;
  photo_url: string | null;
  footer_company: string;
  footer_tagline: string;
  footer_address: string;
  auth_title: string;
  employee_id_label: string;
  employee_id: string;
  access_zones_label: string;
  access_zones: string;
  valid_until_label: string;
  valid_until: string;
  emergency_label: string;
  emergency_phone: string;
  footer_note: string;
  qr_value: string;
  theme_id: string;
  theme_name: string | null;
  theme_dark: string | null;
  theme_dark_soft: string | null;
  theme_accent: string | null;
  theme_accent_soft: string | null;
  theme_gold: string | null;
  background_pattern: string | null;
}

function rowToCardData(row: IdCardRow): CardData {
  return {
    logoImage: row.logo_url,
    companyName: row.company_name,
    companySubtitle: row.company_subtitle,
    roleTitle: row.role_title,
    employeeName: row.employee_name,
    photo: row.photo_url,
    footerCompany: row.footer_company,
    footerTagline: row.footer_tagline,
    footerAddress: row.footer_address,
    authTitle: row.auth_title,
    employeeIdLabel: row.employee_id_label,
    employeeId: row.employee_id,
    accessZonesLabel: row.access_zones_label,
    accessZones: row.access_zones,
    validUntilLabel: row.valid_until_label,
    validUntil: row.valid_until,
    emergencyLabel: row.emergency_label,
    emergencyPhone: row.emergency_phone,
    footerNote: row.footer_note,
    qrValue: row.qr_value,
    theme: row.theme_dark
      ? {
          id: row.theme_id,
          name: row.theme_name ?? 'Kustom',
          dark: row.theme_dark,
          darkSoft: row.theme_dark_soft ?? row.theme_dark,
          accent: row.theme_accent ?? themes[0].accent,
          accentSoft: row.theme_accent_soft ?? themes[0].accentSoft,
          gold: row.theme_gold ?? themes[0].gold,
        }
      : (themes.find((t) => t.id === row.theme_id) ?? themes[0]),
    backgroundPattern: row.background_pattern ?? 'beans',
  };
}

export async function saveCard(data: CardData, id?: string): Promise<SavedCard> {
  if (!supabase) {
    throw new Error(
      'Supabase belum dikonfigurasi. Isi VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY di file .env lalu restart dev server.',
    );
  }

  const [photoUrl, logoUrl] = await Promise.all([
    uploadAsset(data.photo, 'photos'),
    uploadAsset(data.logoImage, 'logos'),
  ]);

  const row = cardDataToRow(data, photoUrl, logoUrl);

  const { data: saved, error } = id
    ? await supabase.from('id_cards').update(row).eq('id', id).select().single()
    : await supabase.from('id_cards').insert(row).select().single();

  if (error) throw error;

  return { id: saved.id, updatedAt: saved.updated_at, data: rowToCardData(saved) };
}

export async function listCards(): Promise<SavedCard[]> {
  if (!supabase) return [];

  const { data: rows, error } = await supabase
    .from('id_cards')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;

  return (rows ?? []).map((row) => ({
    id: row.id,
    updatedAt: row.updated_at,
    data: rowToCardData(row),
  }));
}

export async function deleteCard(id: string): Promise<void> {
  if (!supabase) throw new Error('Supabase belum dikonfigurasi');

  const { error } = await supabase.from('id_cards').delete().eq('id', id);
  if (error) throw error;
}
