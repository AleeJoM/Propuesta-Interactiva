import { GameSession, GameSessionId } from '../domain/entities';
import { GameSessionRepository } from '../domain/repositories';

export class InMemoryGameSessionRepository implements GameSessionRepository {
  private currentSession: GameSession | null = null;
  private readonly sessions = new Map<string, GameSession>();

  async save(session: GameSession): Promise<void> {
    this.sessions.set(session.id.getValue(), session);
    this.currentSession = session;
  }

  async findById(id: GameSessionId): Promise<GameSession | null> {
    const session = this.sessions.get(id.getValue());
    return session || null;
  }

  async getCurrentSession(): Promise<GameSession | null> {
    return this.currentSession;
  }

  async delete(id: GameSessionId): Promise<void> {
    const sessionKey = id.getValue();
    this.sessions.delete(sessionKey);
    
    if (this.currentSession?.id.getValue() === sessionKey) {
      this.currentSession = null;
    }
  }
}
