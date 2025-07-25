import { GameSession, GameSessionId } from '../domain/entities';
import { GameSessionRepository } from '../domain/repositories';

export class InMemoryGameSessionRepository implements GameSessionRepository {
  private currentSession: GameSession | null = null;
  private sessions: Map<string, GameSession> = new Map();

  async save(session: GameSession): Promise<void> {
    this.sessions.set(session.id.getValue(), session);
    this.currentSession = session;
    return Promise.resolve();
  }

  async findById(id: GameSessionId): Promise<GameSession | null> {
    const session = this.sessions.get(id.getValue());
    return Promise.resolve(session || null);
  }

  async getCurrentSession(): Promise<GameSession | null> {
    return Promise.resolve(this.currentSession);
  }
}
