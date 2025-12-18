import type { Region } from '../types';

export const countryToRegion: Record<string, Region> = {
  // Europe
  'Portugal': 'Europe',
  'Spain': 'Europe',
  'Estonia': 'Europe',
  'Croatia': 'Europe',
  'Greece': 'Europe',
  'Italy': 'Europe',
  'Malta': 'Europe',
  'Czech Republic': 'Europe',
  'Iceland': 'Europe',
  'Norway': 'Europe',
  'Romania': 'Europe',
  'Hungary': 'Europe',
  'France': 'Europe',
  'Germany': 'Europe',
  'Netherlands': 'Europe',
  'Cyprus': 'Europe',
  'Latvia': 'Europe',
  'Lithuania': 'Europe',
  
  // Americas
  'United States': 'Americas',
  'Canada': 'Americas',
  'Mexico': 'Americas',
  'Brazil': 'Americas',
  'Argentina': 'Americas',
  'Colombia': 'Americas',
  'Costa Rica': 'Americas',
  'Barbados': 'Americas',
  
  // Asia
  'United Arab Emirates': 'Asia',
  'Thailand': 'Asia',
  'Indonesia': 'Asia',
  'Malaysia': 'Asia',
  'Singapore': 'Asia',
  'Japan': 'Asia',
  'South Korea': 'Asia',
  'Taiwan': 'Asia',
  'Georgia': 'Asia',
  
  // Africa
  'Mauritius': 'Africa',
  'Seychelles': 'Africa',
  'Cape Verde': 'Africa',
  'South Africa': 'Africa',
  
  // Oceania
  'Australia': 'Oceania',
  'New Zealand': 'Oceania',
};

export function getRegion(country: string): Region | null {
  return countryToRegion[country] || null;
}
