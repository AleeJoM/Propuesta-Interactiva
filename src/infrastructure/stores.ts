import { create } from 'zustand';
import { Question, GameSession, GameStatus } from '../domain/entities';

const TOTAL_QUESTIONS = 10;

interface GameState {
  currentQuestion: Question | null;
  gameSession: GameSession | null;
  isLoading: boolean;
  error: string | null;
  
  setCurrentQuestion: (question: Question | null) => void;
  setGameSession: (session: GameSession | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  isGameActive: () => boolean;
  canProceedToNext: () => boolean;
  getCurrentScore: () => number;
}

export const useGameStore = create<GameState>((set, get) => ({
  currentQuestion: null,
  gameSession: null,
  isLoading: false,
  error: null,

  setCurrentQuestion: (question) => set({ currentQuestion: question }),
  setGameSession: (session) => set({ gameSession: session }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),

  isGameActive: () => {
    const { gameSession } = get();
    return gameSession?.status === GameStatus.IN_PROGRESS;
  },

  canProceedToNext: () => {
    const { gameSession } = get();
    if (!gameSession) return false;
    
    return gameSession.currentQuestionIndex < TOTAL_QUESTIONS;
  },

  getCurrentScore: () => {
    const { gameSession } = get();
    return gameSession?.score.getValue() || 0;
  }
}));

interface NavigationState {
  currentRoute: string;
  isTransitioning: boolean;
  
  setCurrentRoute: (route: string) => void;
  setTransitioning: (transitioning: boolean) => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
  currentRoute: '/',
  isTransitioning: false,
  
  setCurrentRoute: (route) => set({ currentRoute: route }),
  setTransitioning: (transitioning) => set({ isTransitioning: transitioning })
}));
