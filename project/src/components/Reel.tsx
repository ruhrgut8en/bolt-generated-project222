import React from 'react';
import { Symbol } from '../types';
import { FileText, Ghost, Pyramid, Syringe, User, FileWarning } from 'lucide-react';

const iconMap = {
  FileText,
  Alien: Ghost,
  Pyramid,
  Syringe,
  User,
  FileWarning
};

interface ReelProps {
  symbols: Symbol[];
  isSpinning: boolean;
}

export const Reel: React.FC<ReelProps> = ({ symbols, isSpinning }) => {
  return (
    <div className={`flex flex-col gap-2 p-4 bg-gray-900 rounded-lg border border-green-500 ${
      isSpinning ? 'animate-spin-slow' : ''
    }`}>
      {symbols.map((symbol, index) => {
        const Icon = iconMap[symbol.icon as keyof typeof iconMap];
        return (
          <div
            key={`${symbol.id}-${index}`}
            className="w-16 h-16 flex items-center justify-center bg-gray-800 rounded-lg border border-green-400/30"
          >
            <Icon className="w-8 h-8 text-green-400" />
          </div>
        );
      })}
    </div>
  );
};
