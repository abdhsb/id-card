import type { CardData } from '../types';
import Section from './Section';
import FormField from './FormField';
import ImageUpload from './ImageUpload';
import ThemePicker from './ThemePicker';
import BackgroundPatternPicker from './BackgroundPatternPicker';

interface Props {
  data: CardData;
  onChange: (data: CardData) => void;
}

export default function Editor({ data, onChange }: Props) {
  const set = <K extends keyof CardData>(key: K, value: CardData[K]) =>
    onChange({ ...data, [key]: value });

  return (
    <div className="flex flex-col">
      <Section title="Tampilan">
        <ThemePicker value={data.theme} onChange={(theme) => set('theme', theme)} />
        <BackgroundPatternPicker
          value={data.backgroundPattern}
          color={data.theme.accent}
          onChange={(patternId) => set('backgroundPattern', patternId)}
        />
        <ImageUpload label="Logo Perusahaan (opsional)" value={data.logoImage} onChange={(v) => set('logoImage', v)} />
      </Section>

      <Section title="Bagian Depan">
        <FormField label="Nama Perusahaan" value={data.companyName} onChange={(v) => set('companyName', v)} />
        <FormField label="Sub Judul Logo" value={data.companySubtitle} onChange={(v) => set('companySubtitle', v)} />
        <ImageUpload label="Foto Karyawan" value={data.photo} onChange={(v) => set('photo', v)} />
        <FormField label="Jabatan / Divisi" value={data.roleTitle} onChange={(v) => set('roleTitle', v)} />
        <FormField label="Nama Karyawan" value={data.employeeName} onChange={(v) => set('employeeName', v)} />
        <FormField label="Nama Perusahaan (footer)" value={data.footerCompany} onChange={(v) => set('footerCompany', v)} />
        <FormField label="Tagline (footer)" value={data.footerTagline} onChange={(v) => set('footerTagline', v)} />
        <FormField label="Alamat (footer)" value={data.footerAddress} onChange={(v) => set('footerAddress', v)} />
      </Section>

      <Section title="Bagian Belakang">
        <FormField label="Judul Autentikasi" value={data.authTitle} onChange={(v) => set('authTitle', v)} />
        <FormField label="Isi QR Code" value={data.qrValue} onChange={(v) => set('qrValue', v)} placeholder="URL atau kode verifikasi" />
        <FormField label="Label ID Karyawan" value={data.employeeIdLabel} onChange={(v) => set('employeeIdLabel', v)} />
        <FormField label="ID Karyawan" value={data.employeeId} onChange={(v) => set('employeeId', v)} />
        <FormField label="Label Zona Akses" value={data.accessZonesLabel} onChange={(v) => set('accessZonesLabel', v)} />
        <FormField label="Zona Akses" value={data.accessZones} onChange={(v) => set('accessZones', v)} />
        <FormField label="Label Berlaku Hingga" value={data.validUntilLabel} onChange={(v) => set('validUntilLabel', v)} />
        <FormField label="Berlaku Hingga" value={data.validUntil} onChange={(v) => set('validUntil', v)} />
        <FormField label="Label Darurat" value={data.emergencyLabel} onChange={(v) => set('emergencyLabel', v)} />
        <FormField label="Nomor Darurat" value={data.emergencyPhone} onChange={(v) => set('emergencyPhone', v)} />
        <FormField label="Catatan Footer" value={data.footerNote} onChange={(v) => set('footerNote', v)} />
      </Section>
    </div>
  );
}
