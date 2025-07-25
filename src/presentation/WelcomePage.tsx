import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { RomanticButton } from '../components/RomanticButton';

export const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Preload animations and sounds here if needed
  }, []);

  const handleStartGame = () => {
    navigate('/game');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #fdf6fb 0%, #e6e6fa 100%)' }}>
      {/* Animated background emojis */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(36)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              fontSize: `${48 + Math.random() * 48}px`,
              filter: 'drop-shadow(0 4px 16px #d946ef) drop-shadow(0 0px 8px #fff)',
              opacity: 0.98,
              zIndex: 1
            }}
            initial={{ 
              x: Math.random() * window.innerWidth * 0.90,
              y: window.innerHeight + 120,
              opacity: 0,
              rotate: 0
            }}
            animate={{
              y: -120,
              opacity: [0, 1, 0.8, 0],
              rotate: 360,
              x: Math.random() * window.innerWidth * 0.90
            }}
            transition={{
              duration: 6 + Math.random() * 3,
              repeat: Infinity,
              delay: i * 0.12,
              ease: "easeInOut"
            }}
          >
            {['💕', '💖', '💝', '❤️‍🔥', '💍', '🫶', '💘', '💞', '💓', '💗', '💐', '💜', '💙', '💚', '💛', '🧡', '❤️'][Math.floor(Math.random() * 20)]}
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-lg mx-auto relative z-10 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-pink-200 p-8"
      >
        {/* Animated hearts */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-6xl mb-8"
        >
          💕
        </motion.div>

        <motion.h1 
          className="text-4xl text-rose-600 mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{ fontFamily: 'Inter, sans-serif', fontStyle: 'normal' }}
        >
          ¡Hola preciosa de mi cora!
          ¿Estás lista para ver de qué se trata? 💕 
        </motion.h1>

        <motion.p 
          className="text-xl text-gray-700 mb-8 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Te armé unas preguntitas... llenas de cariño y espero
          que también llenas de risas, ojalá te gusten...
                            🫶✨
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <RomanticButton onClick={handleStartGame}>
            No aguanto más! QUIERO VER! 👀
          </RomanticButton>
        </motion.div>

        {/* Floating hearts animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl text-pink-300"
              initial={{ 
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 800),
                y: (typeof window !== 'undefined' ? window.innerHeight : 600) + 50,
                opacity: 0
              }}
              animate={{
                y: -50,
                opacity: [0, 1, 0],
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 800)
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeOut"
              }}
            >
              {['💕', '💖', '💝', '🌹', '✨'][Math.floor(Math.random() * 5)]}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
