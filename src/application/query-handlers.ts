import { Question, GameSession } from '../domain/entities';
import { QuestionRepository, GameSessionRepository } from '../domain/repositories';
import { 
  GetCurrentQuestionQuery, 
  GetGameStatusQuery, 
  GetGameScoreQuery 
} from './commands';

export class GetCurrentQuestionQueryHandler {
  constructor(
    private readonly questionRepository: QuestionRepository,
    private readonly gameSessionRepository: GameSessionRepository
  ) {}

  async handle(_query: GetCurrentQuestionQuery): Promise<Question | null> {
    const currentSession = await this.gameSessionRepository.getCurrentSession();
    if (!currentSession) return null;

    const allQuestions = await this.questionRepository.findAll();
    return allQuestions[currentSession.currentQuestionIndex] || null;
  }
}

export class GetGameStatusQueryHandler {
  constructor(private readonly gameSessionRepository: GameSessionRepository) {}

  async handle(_query: GetGameStatusQuery): Promise<GameSession | null> {
    return await this.gameSessionRepository.getCurrentSession();
  }
}

export class GetGameScoreQueryHandler {
  constructor(private readonly gameSessionRepository: GameSessionRepository) {}

  async handle(_query: GetGameScoreQuery): Promise<number> {
    const currentSession = await this.gameSessionRepository.getCurrentSession();
    return currentSession?.score.getValue() || 0;
  }
}
