import { Question, QuestionId } from '../domain/entities';
import { QuestionRepository } from '../domain/repositories';
import { QUESTIONS_DATA } from './data/questions-data';

export class InMemoryQuestionRepository implements QuestionRepository {
  private readonly questions: readonly Question[] = QUESTIONS_DATA;

  async findAll(): Promise<Question[]> {
    return [...this.questions];
  }

  async findById(id: QuestionId): Promise<Question | null> {
    const question = this.questions.find(q => q.id.equals(id));
    return question || null;
  }

  async findByCategory(category: string): Promise<Question[]> {
    const filtered = this.questions.filter(q => q.category === category);
    return filtered;
  }
}
