import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { WelcomePage } from './presentation/WelcomePage';
import { GamePage } from './presentation/GamePage';
import { FinalQuestionPage } from './presentation/FinalQuestionPage';
import { useNavigationStore } from './infrastructure/stores';

const App: React.FC = () => {
  const { isTransitioning } = useNavigationStore();

  return (
    <Router>
      <div className="app-container">
        <AnimatePresence mode="wait" onExitComplete={() => {}}>
          {isTransitioning && (
            <motion.div
              key="transition"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center"
            >
              <div className="text-center text-white">
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 1,
                    repeat: Infinity
                  }}
                  className="text-6xl mb-4"
                >
                  💕
                </motion.div>
                <p className="text-xl font-serif">Cargando...</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <Routes>
            <Route 
              path="/" 
              element={
                <motion.div
                  key="welcome"
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  transition={{ duration: 0.5 }}
                >
                  <WelcomePage />
                </motion.div>
              } 
            />
            
            <Route 
              path="/game" 
              element={
                <motion.div
                  key="game"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5 }}
                >
                  <GamePage />
                </motion.div>
              } 
            />
            
            <Route 
              path="/final-question" 
              element={
                <motion.div
                  key="final"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <FinalQuestionPage />
                </motion.div>
              } 
            />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
};

export default App;
