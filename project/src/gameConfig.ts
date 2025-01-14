import { AlertCircle, Alien, FileText, FileWarning, Pyramid, Syringe, User } from 'lucide-react';
import { Symbol } from './types';

export const SYMBOLS: Symbol[] = [
  // Low symbols (document fragments)
  { id: '10', name: '10', value: 5, type: 'low', icon: 'FileText' },
  { id: 'J', name: 'J', value: 10, type: 'low', icon: 'FileText' },
  { id: 'Q', name: 'Q', value: 15, type: 'low', icon: 'FileText' },
  { id: 'K', name: 'K', value: 20, type: 'low', icon: 'FileText' },
  { id: 'A', name: 'A', value: 25, type: 'low', icon: 'FileText' },
  
  // High symbols (conspiracy icons)
  { id: 'alien', name: 'Alien Evidence', value: 50, type: 'high', icon: 'Alien' },
  { id: 'pyramid', name: 'Ancient Pyramid', value: 75, type: 'high', icon: 'Pyramid' },
  { id: 'virus', name: 'Covid-17', value: 100, type: 'high', icon: 'Syringe' },
  
  // Special symbols
  { id: 'wild', name: 'Informant', value: 0, type: 'wild', icon: 'User' },
  { id: 'scatter', name: 'Classified', value: 0, type: 'scatter', icon: 'FileWarning' }
];

export const REELS_CONFIG = {
  count: 5,
  rows: 3,
  paylines: 10,
  minBet: 10,
  maxBet: 100,
  betStep: 10
};
