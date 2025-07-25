// Domain Entity: Question
export interface Question {
  readonly id: QuestionId;
  readonly text: string;
  readonly options: QuestionOption[];
  readonly category: QuestionCategory;
  readonly points: number;
}

// Value Objects
export class QuestionId {
  constructor(private readonly value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('QuestionId cannot be empty');
    }
  }

  getValue(): string {
    return this.value;
  }

  equals(other: QuestionId): boolean {
    return this.value === other.value;
  }
}

export interface QuestionOption {
  readonly id: string;
  readonly text: string;
  readonly isCorrect?: boolean;
  readonly romanticValue?: number; // 1-5 scale for romantic questions
}

export enum QuestionCategory {
  ROMANTIC = 'romantic',
  COMEDY = 'comedy',
  PREFERENCE = 'preference',
  PERSONALITY = 'personality'
}

// Domain Entity: Game Session
export interface GameSession {
  readonly id: GameSessionId;
  readonly currentQuestionIndex: number;
  readonly answeredQuestions: AnsweredQuestion[];
  readonly score: Score;
  readonly status: GameStatus;
  readonly startedAt: Date;
}

export class GameSessionId {
  constructor(private readonly value: string) {
    if (!value) {
      throw new Error('GameSessionId cannot be empty');
    }
  }

  getValue(): string {
    return this.value;
  }
}

export interface AnsweredQuestion {
  readonly questionId: QuestionId;
  readonly selectedOptionId: string;
  readonly answeredAt: Date;
  readonly points: number;
}

export class Score {
  constructor(private readonly value: number) {
    if (value < 0) {
      throw new Error('Score cannot be negative');
    }
  }

  getValue(): number {
    return this.value;
  }

  add(points: number): Score {
    return new Score(this.value + points);
  }
}

export enum GameStatus {
  NOT_STARTED = 'not_started',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  FINAL_QUESTION = 'final_question'
}
