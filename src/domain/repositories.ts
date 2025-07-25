import { Question, QuestionId, GameSession, GameSessionId, AnsweredQuestion } from './entities';

export interface QuestionRepository {
  findAll(): Promise<Question[]>;
  findById(id: QuestionId): Promise<Question | null>;
  findByCategory(category: string): Promise<Question[]>;
}

export interface GameSessionRepository {
  save(session: GameSession): Promise<void>;
  findById(id: GameSessionId): Promise<GameSession | null>;
  getCurrentSession(): Promise<GameSession | null>;
  delete(id: GameSessionId): Promise<void>;
}

export interface GameService {
  startNewGame(): Promise<GameSession>;
  answerQuestion(sessionId: GameSessionId, questionId: QuestionId, optionId: string): Promise<GameSession>;
  getNextQuestion(sessionId: GameSessionId): Promise<Question | null>;
  completeGame(sessionId: GameSessionId): Promise<GameSession>;
  canProceedToFinalQuestion(sessionId: GameSessionId): Promise<boolean>;
}

export interface ScoreCalculatorService {
  calculateQuestionScore(question: Question, selectedOptionId: string): number;
  calculateTotalScore(answeredQuestions: AnsweredQuestion[]): number;
  calculateRomanticCompatibility(answeredQuestions: AnsweredQuestion[]): number;
}
