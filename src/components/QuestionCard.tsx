import React, { useState, useEffect, useCallback } from 'react';
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
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Reset state when question changes
  useEffect(() => {
    setIsTransitioning(true);
    setSelectedOption(null);
    setHasAnswered(false);
    
    // Small delay to ensure clean transition
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [question.id.getValue()]);

  const handleOptionSelect = useCallback((optionId: string) => {
    if (hasAnswered || isLoading || isTransitioning) return;
    
    setSelectedOption(optionId);
    setHasAnswered(true);
    
    // Add a small delay for visual feedback
    const timer = setTimeout(() => {
      onAnswer(optionId);
    }, 800); // Increased delay to let animation complete
    
    return () => clearTimeout(timer);
  }, [hasAnswered, isLoading, isTransitioning, onAnswer]);

  return (
    <motion.div
      key={question.id.getValue()}
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
        <AnimatePresence mode="wait">
          {question.options.map((option, index) => (
            <motion.button
              key={`${question.id.getValue()}-${option.id}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.1 }}
              whileHover={!hasAnswered ? { scale: 1.02 } : {}}
              whileTap={!hasAnswered ? { scale: 0.98 } : {}}
              className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-300 ${
                !hasAnswered 
                  ? 'border-pink-200 bg-white/60 hover:bg-pink-50 hover:border-pink-400 transform hover:scale-105 hover:shadow-lg cursor-pointer'
                  : selectedOption === option.id 
                    ? 'border-rose-500 bg-pink-100 shadow-lg' 
                    : 'border-gray-200 bg-gray-50/60 opacity-50'
              }`}
              onClick={() => handleOptionSelect(option.id)}
              disabled={hasAnswered || isLoading || isTransitioning}
            >
              <span className="text-lg">{option.text}</span>
              {selectedOption === option.id && (
                <motion.div
                  initial={{ scale: 0, opacity: 0, y: -10 }}
                  animate={{ 
                    scale: [0, 1.3, 1], 
                    opacity: [0, 1, 1],
                    y: [-10, -5, 0]
                  }}
                  transition={{
                    duration: 0.6,
                    ease: "backOut",
                    times: [0, 0.6, 1]
                  }}
                  className="ml-2 inline-block text-rose-500 font-bold"
                >
                  <motion.span
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: 2,
                      ease: "easeInOut"
                    }}
                  >
                    +20💖
                  </motion.span>
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
