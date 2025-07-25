import { create } from 'zustand';
import { Question, GameSession, GameStatus } from '../domain/entities';

interface GameState {
  // State
  currentQuestion: Question | null;
  gameSession: GameSession | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setCurrentQuestion: (question: Question | null) => void;
  setGameSession: (session: GameSession | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Computed
  isGameActive: () => boolean;
  canProceedToNext: () => boolean;
  getCurrentScore: () => number;
}

export const useGameStore = create<GameState>((set, get) => ({
  // Initial State
  currentQuestion: null,
  gameSession: null,
  isLoading: false,
  error: null,

  // Actions
  setCurrentQuestion: (question) => set({ currentQuestion: question }),
  setGameSession: (session) => set({ gameSession: session }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),

  // Computed
  isGameActive: () => {
    const { gameSession } = get();
    return gameSession?.status === GameStatus.IN_PROGRESS;
  },

  canProceedToNext: () => {
    const { gameSession } = get();
    if (!gameSession) return false;
    
    const totalQuestions = 7; // Updated based on our question repository
    // Después de responder, currentQuestionIndex ya está incrementado
    // Si es menor que totalQuestions, significa que hay más preguntas
    return gameSession.currentQuestionIndex < totalQuestions;
  },

  getCurrentScore: () => {
    const { gameSession } = get();
    return gameSession?.score.getValue() || 0;
  }
}));

// Navigation State
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
