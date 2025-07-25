import { Question, GameSession, QuestionId } from '../domain/entities';
import { GameService, GameSessionRepository } from '../domain/repositories';
import { 
  StartGameCommand, 
  AnswerQuestionCommand, 
  NextQuestionCommand,
  CompleteGameCommand 
} from './commands';

const ERRORS = {
  NO_ACTIVE_SESSION: 'No active game session found'
} as const;

export class StartGameCommandHandler {
  constructor(
    private readonly gameService: GameService,
    private readonly gameSessionRepository: GameSessionRepository
  ) {}

  async handle(_command: StartGameCommand): Promise<GameSession> {
    const session = await this.gameService.startNewGame();
    await this.gameSessionRepository.save(session);
    return session;
  }
}

export class AnswerQuestionCommandHandler {
  constructor(
    private readonly gameService: GameService,
    private readonly gameSessionRepository: GameSessionRepository
  ) {}

  async handle(command: AnswerQuestionCommand): Promise<GameSession> {
    const currentSession = await this.getCurrentSessionOrThrow();
    const questionId = new QuestionId(command.questionId);
    
    const updatedSession = await this.gameService.answerQuestion(
      currentSession.id,
      questionId,
      command.optionId
    );

    await this.gameSessionRepository.save(updatedSession);
    return updatedSession;
  }

  private async getCurrentSessionOrThrow(): Promise<GameSession> {
    const session = await this.gameSessionRepository.getCurrentSession();
    if (!session) {
      throw new Error(ERRORS.NO_ACTIVE_SESSION);
    }
    return session;
  }
}

export class NextQuestionCommandHandler {
  constructor(
    private readonly gameService: GameService,
    private readonly gameSessionRepository: GameSessionRepository
  ) {}

  async handle(_command: NextQuestionCommand): Promise<Question | null> {
    const currentSession = await this.getCurrentSessionOrThrow();
    return await this.gameService.getNextQuestion(currentSession.id);
  }

  private async getCurrentSessionOrThrow(): Promise<GameSession> {
    const session = await this.gameSessionRepository.getCurrentSession();
    if (!session) {
      throw new Error(ERRORS.NO_ACTIVE_SESSION);
    }
    return session;
  }
}

export class CompleteGameCommandHandler {
  constructor(
    private readonly gameService: GameService,
    private readonly gameSessionRepository: GameSessionRepository
  ) {}

  async handle(_command: CompleteGameCommand): Promise<GameSession> {
    const currentSession = await this.getCurrentSessionOrThrow();
    const completedSession = await this.gameService.completeGame(currentSession.id);
    await this.gameSessionRepository.save(completedSession);
    return completedSession;
  }

  private async getCurrentSessionOrThrow(): Promise<GameSession> {
    const session = await this.gameSessionRepository.getCurrentSession();
    if (!session) {
      throw new Error(ERRORS.NO_ACTIVE_SESSION);
    }
    return session;
  }
}
