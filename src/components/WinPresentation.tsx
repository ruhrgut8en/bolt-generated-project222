import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface WinPresentationProps {
  amount: number;
  isBigWin: boolean;
  onComplete: () => void;
}

export const WinPresentation: React.FC<WinPresentationProps> = ({
  amount,
  isBigWin,
  onComplete
}) => {
  const [displayAmount, setDisplayAmount] = useState(0);

  useEffect(() => {
    if (isBigWin) {
      // Launch confetti for big wins
      const duration = 3000;
      const animationEnd = Date.now() + duration;

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
          clearInterval(interval);
          return;
        }

        confetti({
          particleCount: 3,
          angle: randomInRange(55, 125),
          spread: randomInRange(50, 70),
          origin: { y: 0.6 }
        });
      }, 50);

      return () => clearInterval(interval);
    }
  }, [isBigWin]);

  // Animate win amount counting up
  useEffect(() => {
    const duration = isBigWin ? 2000 : 1000;
    const steps = 20;
    const increment = amount / steps;
    let current = 0;

    const interval = setInterval(() => {
      current += increment;
      if (current >= amount) {
        setDisplayAmount(amount);
        clearInterval(interval);
        setTimeout(onComplete, 1000);
      } else {
        setDisplayAmount(current);
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [amount, isBigWin, onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className={`
            relative p-8 rounded-lg text-center
            ${isBigWin ? 'big-win-container' : 'normal-win-container'}
          `}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
        >
          {/* Win text */}
          <motion.div
            className={`
              text-4xl font-bold mb-4
              ${isBigWin ? 'text-yellow-400' : 'text-green-400'}
            `}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, -5, 5, 0]
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity
            }}
          >
            {isBigWin ? 'BIG WIN!' : 'WIN!'}
          </motion.div>

          {/* Win amount */}
          <motion.div
            className={`
              text-6xl font-bold
              ${isBigWin ? 'text-yellow-400' : 'text-green-400'}
            `}
            animate={{
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 0.3,
              repeat: Infinity
            }}
          >
            {displayAmount.toFixed(2)}
          </motion.div>

          {/* Decorative elements for big wins */}
          {isBigWin && (
            <>
              <motion.div
                className="absolute inset-0 big-win-rays"
                animate={{
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <motion.div
                className="absolute inset-0 big-win-sparkles"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
              />
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
