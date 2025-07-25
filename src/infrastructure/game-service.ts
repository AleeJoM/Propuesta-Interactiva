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
    const session = await this.gameSessionRepository.findById(sessionId);
    if (!session) {
      throw new Error('Game session not found');
    }

    const question = await this.questionRepository.findById(questionId);
    if (!question) {
      throw new Error('Question not found');
    }

    const points = this.scoreCalculator.calculateQuestionScore(question, optionId);
    
    const answeredQuestion: AnsweredQuestion = {
      questionId,
      selectedOptionId: optionId,
      answeredAt: new Date(),
      points
    };

    const updatedAnsweredQuestions = [...session.answeredQuestions, answeredQuestion];
    const newScore = session.score.add(points);
    
    // Check if this is the last question
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
    if (!session) {
      return null;
    }

    const allQuestions = await this.questionRepository.findAll();
    
    // El currentQuestionIndex ya fue incrementado en answerQuestion
    // por lo que apunta a la siguiente pregunta que queremos mostrar
    if (session.currentQuestionIndex >= allQuestions.length) {
      return null;
    }

    return allQuestions[session.currentQuestionIndex];
  }

  async completeGame(sessionId: GameSessionId): Promise<GameSession> {
    const session = await this.gameSessionRepository.findById(sessionId);
    if (!session) {
      throw new Error('Game session not found');
    }

    const updatedSession: GameSession = {
      ...session,
      status: GameStatus.COMPLETED
    };

    return updatedSession;
  }

  async canProceedToFinalQuestion(sessionId: GameSessionId): Promise<boolean> {
    const session = await this.gameSessionRepository.findById(sessionId);
    if (!session) {
      return false;
    }

    // Logic: Can proceed to final question if romantic compatibility is above threshold
    const romanticScore = this.scoreCalculator.calculateRomanticCompatibility(session.answeredQuestions);
    return romanticScore >= 60; // 60% compatibility threshold
  }
}

export class ScoreCalculatorServiceImpl implements ScoreCalculatorService {
  calculateQuestionScore(question: Question, selectedOptionId: string): number {
    const selectedOption = question.options.find(opt => opt.id === selectedOptionId);
    if (!selectedOption) {
      return 0;
    }

    // Base points from question
    let points = question.points;
    
    // Add romantic value bonus
    if (selectedOption.romanticValue) {
      points += selectedOption.romanticValue * 2; // Multiply romantic value
    }

    return points;
  }

  calculateTotalScore(answeredQuestions: AnsweredQuestion[]): number {
    return answeredQuestions.reduce((total, answer) => total + answer.points, 0);
  }

  calculateRomanticCompatibility(answeredQuestions: AnsweredQuestion[]): number {
    // This would be more sophisticated in a real app
    // For now, calculate based on total romantic points vs maximum possible
    const totalRomanticPoints = answeredQuestions.reduce((total, answer) => total + answer.points, 0);
    const maxPossiblePoints = answeredQuestions.length * 20; // Assuming max 20 points per question
    
    return Math.min(100, (totalRomanticPoints / maxPossiblePoints) * 100);
  }
}
