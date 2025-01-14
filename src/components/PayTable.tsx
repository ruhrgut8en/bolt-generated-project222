import React from 'react';
import { motion } from 'framer-motion';
import { SYMBOLS } from '../gameConfig';

interface PayTableProps {
  bet: number;
  activePaylines: number;
}

export const PayTable: React.FC<PayTableProps> = ({ bet, activePaylines }) => {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="mt-4 bg-[#1A0F0A] rounded-lg p-4"
    >
      <h2 className="text-xl font-bold text-[#C4973B] mb-4">Paytable</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* High Paying Symbols */}
        <div>
          <h3 className="text-lg font-bold mb-2">High Paying Symbols</h3>
          <div className="space-y-2">
            {Object.values(SYMBOLS)
              .filter(symbol => symbol.type === 'high')
              .map(symbol => (
                <div key={symbol.id} className="flex items-center gap-4">
                  <img
                    src={`/symbols/${symbol.id}.png`}
                    alt={symbol.name}
                    className="w-12 h-12 object-contain"
                  />
                  <div className="flex-1">
                    <div className="font-bold">{symbol.name}</div>
                    <div className="text-sm">
                      {symbol.multiplier.map((m, i) => m > 0 ? (
                        <span key={i} className="mr-2">
                          {i + 1}x: {(m * bet).toFixed(2)}
                        </span>
                      ) : null)}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Low Paying Symbols */}
        <div>
          <h3 className="text-lg font-bold mb-2">Card Symbols</h3>
          <div className="space-y-2">
            {Object.values(SYMBOLS)
              .filter(symbol => symbol.type === 'low')
              .map(symbol => (
                <div key={symbol.id} className="flex items-center gap-4">
                  <img
                    src={`/symbols/${symbol.id}.png`}
                    alt={symbol.name}
                    className="w-12 h-12 object-contain"
                  />
                  <div className="flex-1">
                    <div className="font-bold">{symbol.name}</div>
                    <div className="text-sm">
                      {symbol.multiplier.map((m, i) => m > 0 ? (
                        <span key={i} className="mr-2">
                          {i + 1}x: {(m * bet).toFixed(2)}
                        </span>
                      ) : null)}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Special Symbols */}
      <div className="mt-4">
        <h3 className="text-lg font-bold mb-2">Special Symbols</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Book Symbol */}
          <div className="flex items-center gap-4">
            <img
              src="/symbols/book.png"
              alt="Book"
              className="w-12 h-12 object-contain"
            />
            <div>
              <div className="font-bold">Book</div>
              <div className="text-sm">
                Substitutes for all symbols
                <br />
                3 or more trigger 10 Free Spins
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Lines */}
      <div className="mt-4">
        <h3 className="text-lg font-bold mb-2">Active Lines: {activePaylines}</h3>
        <div className="text-sm">
          Total Bet: {(bet * activePaylines).toFixed(2)}
        </div>
      </div>
    </motion.div>
  );
};
