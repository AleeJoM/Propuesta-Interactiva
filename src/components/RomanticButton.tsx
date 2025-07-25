import React from 'react';
import { motion } from 'framer-motion';

interface RomanticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  className?: string;
}

const VARIANTS = {
  primary: 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg hover:from-pink-600 hover:to-rose-600',
  secondary: 'bg-white text-rose-600 border-2 border-rose-500 hover:bg-rose-500 hover:text-white'
} as const;

const BASE_CLASSES = 'px-6 py-3 rounded-full font-medium transition-all duration-300 transform focus:outline-none focus:ring-4 focus:ring-pink-300';

export const RomanticButton: React.FC<RomanticButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  className = ''
}) => {
  const buttonClasses = `${BASE_CLASSES} ${VARIANTS[variant]} ${className} ${
    disabled ? 'opacity-50 cursor-not-allowed' : ''
  }`;

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
};
