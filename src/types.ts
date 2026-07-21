export interface CardTheme {
  id: string;
  name: string;
  dark: string;
  darkSoft: string;
  accent: string;
  accentSoft: string;
  gold: string;
}

export interface CardData {
  logoImage: string | null;
  companyName: string;
  companySubtitle: string;
  roleTitle: string;
  employeeName: string;
  photo: string | null;
  footerCompany: string;
  footerTagline: string;
  footerAddress: string;

  authTitle: string;
  employeeIdLabel: string;
  employeeId: string;
  accessZonesLabel: string;
  accessZones: string;
  validUntilLabel: string;
  validUntil: string;
  emergencyLabel: string;
  emergencyPhone: string;
  footerNote: string;
  qrValue: string;

  theme: CardTheme;
  backgroundPattern: string;
}
