import type { CardData } from './types';
import { themes } from './themes';

export const defaultData: CardData = {
  logoImage: null,
  companyName: 'Sultan Coffee',
  companySubtitle: 'Coffee',
  roleTitle: 'Street Salero Crew',
  employeeName: 'Arif Rahman',
  photo: null,
  footerCompany: 'Sultan Coffee',
  footerTagline: 'Crew Street Salero',
  footerAddress: 'Jl. Merdeka No. 123, Jakarta',

  authTitle: 'Authentication & Access',
  employeeIdLabel: 'Unique Employee ID',
  employeeId: 'SC001-AR',
  accessZonesLabel: 'Access Zones',
  accessZones: 'All Areas',
  validUntilLabel: 'Valid Until',
  validUntil: 'Dec 2024',
  emergencyLabel: 'Emergency',
  emergencyPhone: '+62 812 3456 789',
  footerNote: 'Property of Sultan Coffee - Do Not Replicate',
  qrValue: 'https://sultancoffee.example/verify/SC001-AR',

  theme: themes[0],
};
