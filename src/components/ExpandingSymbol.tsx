import React from 'react';
import { motion } from 'framer-motion';
import { Symbol } from '../types';

interface ExpandingSymbolProps {
  symbol: Symbol;
  positions: number[];
}

export const ExpandingSymbol: React.FC<ExpandingSymbolProps> = ({
  symbol,
  positions
}) => {
  return (
    <motion.div
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      exit={{ scaleY: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 flex items-center justify-center"
    >
      {positions.map((position, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className="absolute"
          style={{
            left: `${(position % 5) * 20}%`,
            top: `${Math.floor(position / 5) * 33.33}%`
          }}
        >
          <img
            src={`/symbols/${symbol.id}.png`}
            alt={symbol.name}
            className="w-20 h-60 object-cover"
          />
        </motion.div>
      ))}
    </motion.div>
  );
};
