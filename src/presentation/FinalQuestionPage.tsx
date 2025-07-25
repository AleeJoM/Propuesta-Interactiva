import React, { useState, useEffect } from 'react';
import { getRandomFinalMessage } from '../config/custom-questions';
import { motion } from 'framer-motion';
import { RomanticButton } from '../components/RomanticButton';
import { useGameStore } from '../infrastructure/stores';

const LEGAL_FRAME_DURATION = 10000;
const IMAGE_REVEAL_DELAY = 10000;
const EMOJI_SET = ['💕', '💖', '💝', '🌹', '✨', '💍', '🦋', '🌟', '🫶', '💘', '💞', '💓', '💗', '💐', '💜', '💙', '💚', '💛', '🧡', '❤️'];

const LEGAL_FRAMES = [
  {
    text: "Completaste el cuestionario... Y ahora...",
    color: "bg-gradient-to-br from-blue-300 via-indigo-200 to-blue-50 border-4 border-indigo-400 text-indigo-900",
    emoji: "⌛"
  },
  {
    text: "Como buena estudiante de derecho... Sabés que toda pregunta final puede cambiar el rumbo de un caso...",
    color: "bg-gradient-to-br from-yellow-300 via-orange-200 to-yellow-50 border-4 border-orange-400 text-orange-900",
    emoji: "⚖️"
  },
  {
    text: "¿Estás lista para la sentencia más importante?",
    color: "bg-gradient-to-br from-pink-300 via-fuchsia-200 to-pink-50 border-4 border-fuchsia-400 text-fuchsia-900",
    emoji: "👀"
  },
  {
    text: "Preparate para la pregunta que podría cambiar tu estado... ¿Civil?...",
    color: "bg-gradient-to-br from-green-300 via-teal-200 to-green-50 border-4 border-teal-400 text-teal-900",
    emoji: "🤔"
  }
];

export const FinalQuestionPage: React.FC = () => {
  const { getCurrentScore } = useGameStore();
  const [userResponse, setUserResponse] = useState<'yes' | 'no' | null>(null);
  const [trollAttempts] = useState(0);
  const [showTrollMessage, setShowTrollMessage] = useState(false);
  const [showLegalFrames, setShowLegalFrames] = useState(true);
  const [frameIndex, setFrameIndex] = useState(0);
  const [showSurpriseModal, setShowSurpriseModal] = useState(false);
  const [imageRevealed, setImageRevealed] = useState(false);
  const [currentTrollMessage, setCurrentTrollMessage] = useState<string>("");

  useEffect(() => {
    if (showSurpriseModal) {
      setImageRevealed(false);
      const timer = setTimeout(() => setImageRevealed(true), IMAGE_REVEAL_DELAY);
      return () => clearTimeout(timer);
    }
  }, [showSurpriseModal]);

  useEffect(() => {
    if (showLegalFrames && frameIndex < LEGAL_FRAMES.length) {
      const timer = setTimeout(() => {
        setFrameIndex(frameIndex + 1);
      }, LEGAL_FRAME_DURATION);
      return () => clearTimeout(timer);
    } else if (frameIndex >= LEGAL_FRAMES.length) {
      setShowLegalFrames(false);
    }
  }, [showLegalFrames, frameIndex]);

  const handleNoClick = () => {
    setCurrentTrollMessage(getRandomFinalMessage());
    setShowTrollMessage(true);
  };

  const handleResponse = (response: 'yes' | 'no') => {
    if (response === 'no') {
      handleNoClick();
      return;
    }
    
    setUserResponse(response);
  };

  const score = getCurrentScore();
  const compatibilityPercentage = Math.min(100, Math.max(60, (score / 100) * 100));

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden" style={{ background: 'transparent' }}>
      {/* Animated background elements */}
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
              y: window.innerHeight - 80,
              opacity: 0,
              rotate: 0
            }}
            animate={{
              y: -80,
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
            {EMOJI_SET[Math.floor(Math.random() * EMOJI_SET.length)]}
          </motion.div>
        ))}
      </div>

      {showLegalFrames ? (
        <>
          {frameIndex < LEGAL_FRAMES.length && (
            <motion.div
              key={frameIndex}
              initial={{ opacity: 0, scale: 0.92, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: -40 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className={`flex flex-col items-center justify-center min-h-[60vh] w-full z-30 rounded-[2.5rem] shadow-2xl border-4 p-8 md:p-16 transition-all duration-700 bg-white/80 backdrop-blur-lg ${LEGAL_FRAMES[frameIndex].color}`}
              style={{
                boxShadow: '0 12px 40px 0 rgba(60,60,120,0.22)',
                backdropFilter: 'blur(10px)',
                fontFamily: 'Montserrat, Inter, sans-serif',
              }}
            >
              <div className="text-6xl md:text-8xl mb-8 md:mb-14 drop-shadow-2xl animate-bounce-slow" style={{ fontFamily: 'Montserrat, Inter, sans-serif', fontWeight: 700, letterSpacing: '0.04em' }}>
                {LEGAL_FRAMES[frameIndex].emoji}
              </div>
              <h2 className="text-2xl md:text-4xl font-extrabold mb-4 md:mb-8 text-center leading-tight md:leading-normal tracking-wide" style={{ fontFamily: 'Montserrat, Inter, sans-serif', fontWeight: 800, letterSpacing: '0.03em', textShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                {LEGAL_FRAMES[frameIndex].text}
              </h2>
              <div className="text-lg md:text-2xl text-gray-800 text-center font-semibold italic" style={{ fontFamily: 'Montserrat, Inter, sans-serif', letterSpacing: '0.02em' }}>
                {frameIndex === 2 && 'La constitución no te prepara para esto...'}
                {frameIndex === 3 && '¿Apelás?... ¿Aceptás el fallo?... HABLE AHORA O CALLE PARA SIEMPRE'}
              </div>
            </motion.div>
          )}
        </>
      ) : (
        // ...existing code...
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-2xl mx-auto relative z-20"
        >
          {/* Score display */}
        <motion.div 
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-pink-200 p-6 mb-8 z-10"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-xl text-rose-600 mb-2" style={{ fontFamily: 'Inter, sans-serif', fontStyle: 'normal' }}>
              Y tu puntaje amoroso conmigo es...
            </h3>
            <div className="text-4xl font-bold text-rose-600 mb-2">
              200 💖
            </div>
            <div className="text-lg text-gray-600">
              Con una compatibilidad deeeel... {compatibilityPercentage}% ✨
            </div>
          </motion.div>

          {/* Main question */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-pink-200 p-8"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-6xl mb-6"
            >
              💘
            </motion.div>

            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Y bueno, finalmente, después de estas preguntas que tratan de
              tu profesión, de lo que elegiste para vos, para tu futuro,
              que me vuelve loco escucharte y verte hacer lo tuyo... Combinando con
              temas que también nos involucran, como lo picante, lo amoroso,
              lo intrigante y lo divertido que nos une a ambos...
              Te puedo decir que estoy confirmando lo que mi corazón me dijo
              desde el momento uno en el que ME DISTE BOLA...
              Sos una personita increíble, única, me haces cada día más feliz,
              me dejas atónito día tras día, me gustaría proyectar un futuro juntos,
              por eso mismo, te digo si... 💕
            </p>

            <h1 className="text-4xl text-rose-600 mb-6" style={{ fontFamily: 'Inter, sans-serif', fontStyle: 'normal' }}>
              ¿Te gustaría ser mi novia, Agutilinda? 💘
            </h1>

            {!userResponse ? (
              <motion.div 
                className="flex gap-6 justify-center flex-wrap relative"
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <RomanticButton 
                  onClick={() => {
                    handleResponse('yes');
                    setTimeout(() => setShowSurpriseModal(true), 1200);
                  }}
                  className="text-xl px-8 py-4 z-10"
                >
                  ¡Obvio que si, mi amorrrr precioso! 💕
                </RomanticButton>
                
                <div
                  style={{ minWidth: '120px', maxWidth: '160px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                >
                  <button 
                    onClick={() => handleResponse('no')}
                    style={{ width: '80px', height: '32px', fontSize: '14px', border: '2px dashed #f87171', background: '#fff0f0', color: '#be123c', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', marginBottom: '8px', boxShadow: '2px 2px 0 #f87171' }}
                  >
                    NO 😬
                  </button>
                  {showTrollMessage && (
                    <div style={{ fontSize: '13px', color: '#be123c', background: '#fff0f0', border: '1px solid #f87171', borderRadius: '4px', padding: '6px', marginTop: '2px', minHeight: '32px', textAlign: 'center', maxWidth: '140px' }}>
                      {currentTrollMessage}
                    </div>
                  )}
                </div>
                
                {trollAttempts > 2 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute -bottom-16 left-1/2 transform -translate-x-1/2"
                  >
                    <p className="text-gray-600 text-sm text-center">
                      ¡Ese botón ya no funciona! Solo queda una opción... 😈💖
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-3xl text-rose-600 mb-4" style={{ fontFamily: 'Inter, sans-serif', fontStyle: 'normal' }}>
                  Sos lo mejor que existe, TE AMO TODA! 
                </h2>
                <p className="text-xl text-gray-700 mb-6">
                  Me hacés el más feliz, hermosa! 
                  Te amo menos que ayer y cada vez con más locura y con pasión, bonita 💕✨
                </p>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="text-4xl"
                >
                  💖
                </motion.div>
                <div className="mt-6 text-lg text-gray-600">
                  Ahora ya sabés que sos MÍA, con CERTEZAS 💋
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
      {showSurpriseModal && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.7 }}
        >
          <motion.div 
            className="bg-gradient-to-br from-gray-50 via-pink-100 to-fuchsia-100 rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 max-w-[95vw] sm:max-w-lg md:max-w-2xl w-full flex flex-col items-center relative max-h-[90vh] overflow-y-auto" 
            initial={{ scale: 0.8, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            transition={{ duration: 0.6, type: 'spring', bounce: 0.3 }}
          >
            <motion.img 
              src="/Propuesta-Interactiva/assets/con_rus.jpeg" 
              alt="Entradas sorpresa" 
              className="w-full max-w-full h-auto rounded-2xl mb-4 sm:mb-6 md:mb-8 shadow-xl border-2 sm:border-4 border-pink-300" 
              initial={{ filter: 'blur(18px) grayscale(1)', opacity: 0.5 }} 
              animate={imageRevealed ? { filter: 'blur(0px) grayscale(0)', opacity: 1 } : { filter: 'blur(18px) grayscale(1)', opacity: 0.7 }} 
              transition={{ duration: 1.2 }}
            />
            <motion.div 
              className="text-center text-lg sm:text-xl md:text-2xl lg:text-3xl text-fuchsia-900 mb-4 sm:mb-6 md:mb-8 whitespace-pre-line font-[Playfair_Display] tracking-wide px-2" 
              style={{ fontFamily: 'Playfair Display, Montserrat, serif' }}
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.7, duration: 0.7 }}
            >
              <span className="text-2xl sm:text-3xl font-bold text-pink-500 animate-pulse">?</span>
              <br />Yyy como sorpresa de la sorpresa de la sorpresa ya final...
              <br />Tengo algo que sé que te gusta y podemos compartir...
              <br />Sip... El día <span className="font-semibold text-pink-600">25 de octubre</span>... ¿Te suena?...
              <br />A un año exacto de como empezó todo...
            </motion.div>
            <motion.button
              onClick={() => setShowSurpriseModal(false)}
              className={`mt-2 px-4 sm:px-6 py-2 bg-pink-500 text-white rounded-full shadow hover:bg-pink-600 transition-all text-base sm:text-lg font-semibold ${!imageRevealed ? 'opacity-50 cursor-not-allowed' : ''}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.4 }}
              disabled={!imageRevealed}
            >
              {imageRevealed ? 'Cerrar sorpresita 🎁🫶' : 'Espera...'}
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};