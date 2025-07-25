import { 
  GameService, 
  ScoreCalculatorService,
  QuestionRepository,
  GameSessionRepository 
} from '../domain/repositories';
import {
  Question,
  GameSession,
  GameSessionId,
  QuestionId,
  Score,
  GameStatus,
  AnsweredQuestion
} from '../domain/entities';

const ROMANTIC_COMPATIBILITY_THRESHOLD = 60;
const ROMANTIC_VALUE_MULTIPLIER = 2;
const MAX_POINTS_PER_QUESTION = 20;

export class GameServiceImpl implements GameService {
  constructor(
    private readonly questionRepository: QuestionRepository,
    private readonly gameSessionRepository: GameSessionRepository,
    private readonly scoreCalculator: ScoreCalculatorService
  ) {}

  async startNewGame(): Promise<GameSession> {
    const sessionId = new GameSessionId(crypto.randomUUID());
    
    const newSession: GameSession = {
      id: sessionId,
      currentQuestionIndex: 0,
      answeredQuestions: [],
      score: new Score(0),
      status: GameStatus.IN_PROGRESS,
      startedAt: new Date()
    };

    return newSession;
  }

  async answerQuestion(
    sessionId: GameSessionId, 
    questionId: QuestionId, 
    optionId: string
  ): Promise<GameSession> {
    const session = await this.getSessionOrThrow(sessionId);
    const question = await this.getQuestionOrThrow(questionId);

    const points = this.scoreCalculator.calculateQuestionScore(question, optionId);
    
    const answeredQuestion: AnsweredQuestion = {
      questionId,
      selectedOptionId: optionId,
      answeredAt: new Date(),
      points
    };

    const updatedAnsweredQuestions = [...session.answeredQuestions, answeredQuestion];
    const newScore = session.score.add(points);
    
    const allQuestions = await this.questionRepository.findAll();
    const isLastQuestion = session.currentQuestionIndex >= allQuestions.length - 1;
    
    const updatedSession: GameSession = {
      ...session,
      currentQuestionIndex: session.currentQuestionIndex + 1,
      answeredQuestions: updatedAnsweredQuestions,
      score: newScore,
      status: isLastQuestion ? GameStatus.COMPLETED : session.status
    };

    return updatedSession;
  }

  async getNextQuestion(sessionId: GameSessionId): Promise<Question | null> {
    const session = await this.gameSessionRepository.findById(sessionId);
    if (!session) return null;

    const allQuestions = await this.questionRepository.findAll();
    
    if (session.currentQuestionIndex >= allQuestions.length) {
      return null;
    }

    return allQuestions[session.currentQuestionIndex];
  }

  async completeGame(sessionId: GameSessionId): Promise<GameSession> {
    const session = await this.getSessionOrThrow(sessionId);

    const updatedSession: GameSession = {
      ...session,
      status: GameStatus.COMPLETED
    };

    return updatedSession;
  }

  async canProceedToFinalQuestion(sessionId: GameSessionId): Promise<boolean> {
    const session = await this.gameSessionRepository.findById(sessionId);
    if (!session) return false;

    const romanticScore = this.scoreCalculator.calculateRomanticCompatibility(session.answeredQuestions);
    return romanticScore >= ROMANTIC_COMPATIBILITY_THRESHOLD;
  }

  private async getSessionOrThrow(sessionId: GameSessionId): Promise<GameSession> {
    const session = await this.gameSessionRepository.findById(sessionId);
    if (!session) {
      throw new Error('Game session not found');
    }
    return session;
  }

  private async getQuestionOrThrow(questionId: QuestionId): Promise<Question> {
    const question = await this.questionRepository.findById(questionId);
    if (!question) {
      throw new Error('Question not found');
    }
    return question;
  }
}

export class ScoreCalculatorServiceImpl implements ScoreCalculatorService {
  calculateQuestionScore(question: Question, selectedOptionId: string): number {
    const selectedOption = question.options.find(opt => opt.id === selectedOptionId);
    if (!selectedOption) return 0;

    let points = question.points;
    
    if (selectedOption.romanticValue) {
      points += selectedOption.romanticValue * ROMANTIC_VALUE_MULTIPLIER;
    }

    return points;
  }

  calculateTotalScore(answeredQuestions: AnsweredQuestion[]): number {
    return answeredQuestions.reduce((total, answer) => total + answer.points, 0);
  }

  calculateRomanticCompatibility(answeredQuestions: AnsweredQuestion[]): number {
    const totalRomanticPoints = answeredQuestions.reduce((total, answer) => total + answer.points, 0);
    const maxPossiblePoints = answeredQuestions.length * MAX_POINTS_PER_QUESTION;
    
    return Math.min(100, (totalRomanticPoints / maxPossiblePoints) * 100);
  }
}
