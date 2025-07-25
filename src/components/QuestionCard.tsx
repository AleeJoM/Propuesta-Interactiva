import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Question } from '../domain/entities';

interface QuestionCardProps {
  question: Question;
  onAnswer: (optionId: string) => void;
  isLoading?: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onAnswer,
  isLoading = false
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  // Reset state when question changes
  useEffect(() => {
    setSelectedOption(null);
    setHasAnswered(false);
  }, [question.id.getValue()]);

  const handleOptionSelect = (optionId: string) => {
    if (hasAnswered || isLoading) return;
    
    setSelectedOption(optionId);
    setHasAnswered(true);
    
    // Add a small delay for visual feedback
    setTimeout(() => {
      onAnswer(optionId);
    }, 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-pink-200 p-6 max-w-2xl mx-auto"
    >
      <motion.h2 
        className="text-2xl text-center text-gray-800 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{ fontFamily: 'Inter, sans-serif', fontStyle: 'normal' }}
      >
        {question.text}
      </motion.h2>

      <div className="space-y-4">
        <AnimatePresence>
          {question.options.map((option, index) => (
            <motion.button
              key={option.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.1 }}
              whileHover={!hasAnswered ? { scale: 1.02 } : {}}
              whileTap={!hasAnswered ? { scale: 0.98 } : {}}
              className={`w-full p-4 text-left rounded-xl border-2 border-pink-200 bg-white/60 hover:bg-pink-50 hover:border-pink-400 transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                selectedOption === option.id ? 'border-rose-500 bg-pink-100' : ''
              } ${hasAnswered && selectedOption !== option.id ? 'opacity-50' : ''}`}
              onClick={() => handleOptionSelect(option.id)}
              disabled={hasAnswered || isLoading}
            >
              <span className="text-lg">{option.text}</span>
              {selectedOption === option.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="ml-2 inline-block"
                >
                  💖
                </motion.div>
              )}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-6"
        >
          <div className="animate-spin w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full mx-auto"></div>
          <p className="text-rose-600 mt-2">Analizando tu respuesta... 🤔</p>
        </motion.div>
      )}
    </motion.div>
  );
};
