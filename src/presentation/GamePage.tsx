import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../infrastructure/stores';
import { QuestionCard } from '../components/QuestionCard';
import { RomanticButton } from '../components/RomanticButton';

import { 
  StartGameCommandHandler,
  AnswerQuestionCommandHandler
} from '../application/command-handlers';

import { InMemoryQuestionRepository } from '../infrastructure/question-repository';
import { InMemoryGameSessionRepository } from '../infrastructure/game-session-repository';
import { GameServiceImpl, ScoreCalculatorServiceImpl } from '../infrastructure/game-service';

const TOTAL_EMOJIS = 36;
const EMOJI_SET = ['💕', '💖', '💝', '🌹', '✨', '💍', '🦋', '🌟', '🫶', '💘', '💞', '💓', '💗', '💐', '💜', '💙', '💚', '💛', '🧡', '❤️'];
const LOADING_DELAY = 1000;

const getRandomEmoji = () => EMOJI_SET[Math.floor(Math.random() * EMOJI_SET.length)];
const getRandomPosition = () => Math.random() * (window?.innerWidth || 800) * 0.90;

export const GamePage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    currentQuestion, 
    gameSession, 
    isLoading,
    setCurrentQuestion, 
    setGameSession, 
    setLoading
  } = useGameStore();

  const [questionRepository] = useState(() => new InMemoryQuestionRepository());
  const [sessionRepository] = useState(() => new InMemoryGameSessionRepository());
  const [scoreCalculator] = useState(() => new ScoreCalculatorServiceImpl());
  const [gameService] = useState(() => new GameServiceImpl(questionRepository, sessionRepository, scoreCalculator));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [startGameHandler] = useState(() => new StartGameCommandHandler(gameService, sessionRepository));
  const [answerQuestionHandler] = useState(() => new AnswerQuestionCommandHandler(gameService, sessionRepository));

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = async () => {
    setLoading(true);
    try {
      const session = await startGameHandler.handle({ type: 'START_GAME' });
      setGameSession(session);

      const allQuestions = await questionRepository.findAll();
      
      if (allQuestions.length > 0) {
        setCurrentQuestion(allQuestions[0]);
      }
    } catch (error) {
      console.error('Error initializing game:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerQuestion = async (optionId: string) => {
    if (!currentQuestion || !gameSession) return;

    setLoading(true);
    try {
      const updatedSession = await answerQuestionHandler.handle({
        type: 'ANSWER_QUESTION',
        questionId: currentQuestion.id.getValue(),
        optionId
      });
      
      setGameSession(updatedSession);

      await new Promise(resolve => setTimeout(resolve, LOADING_DELAY));

      const allQuestions = await questionRepository.findAll();
      const nextIndex = currentQuestionIndex + 1;
      
      if (nextIndex >= allQuestions.length) {
        navigate('/final-question');
        return;
      }

      setCurrentQuestion(allQuestions[nextIndex]);
      setCurrentQuestionIndex(nextIndex);

    } catch (error) {
      console.error('Error answering question:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!currentQuestion && !isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif text-rose-600 mb-4">
            ¡Ups! Algo salió mal 😅
          </h2>
          <RomanticButton onClick={initializeGame}>
            Intentar de nuevo
          </RomanticButton>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden" 
      style={{ background: 'linear-gradient(135deg, #fdf6fb 0%, #e6e6fa 100%)' }}
    >
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(TOTAL_EMOJIS)].map((_, i) => (
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
              x: getRandomPosition(),
              y: (window?.innerHeight || 600) + 120,
              opacity: 0,
              rotate: 0
            }}
            animate={{
              y: -120,
              opacity: [0, 1, 0.8, 0],
              rotate: 360,
              x: getRandomPosition()
            }}
            transition={{
              duration: 6 + Math.random() * 3,
              repeat: Infinity,
              delay: i * 0.12,
              ease: "easeInOut"
            }}
          >
            {getRandomEmoji()}
          </motion.div>
        ))}
      </div>

      <div className="w-full max-w-4xl relative z-10">
        {isLoading && !currentQuestion ? (
          <motion.div 
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-pink-200 p-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="animate-pulse">
              <div className="text-4xl mb-4">💕</div>
              <p className="text-lg text-rose-600">Preparando tu pregunta...</p>
            </div>
          </motion.div>
        ) : currentQuestion ? (
          <QuestionCard
            question={currentQuestion}
            onAnswer={handleAnswerQuestion}
            isLoading={isLoading}
          />
        ) : null}

        <motion.div 
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <RomanticButton 
            variant="secondary" 
            onClick={() => navigate('/')}
          >
            Volver al inicio
          </RomanticButton>
        </motion.div>
      </div>
    </div>
  );
};
