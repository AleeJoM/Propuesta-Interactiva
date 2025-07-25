// CQRS Commands
export interface Command {
  readonly type: string;
}

export interface StartGameCommand extends Command {
  readonly type: 'START_GAME';
}

export interface AnswerQuestionCommand extends Command {
  readonly type: 'ANSWER_QUESTION';
  readonly questionId: string;
  readonly optionId: string;
}

export interface NextQuestionCommand extends Command {
  readonly type: 'NEXT_QUESTION';
}

export interface CompleteGameCommand extends Command {
  readonly type: 'COMPLETE_GAME';
}

// CQRS Queries
export interface Query {
  readonly type: string;
}

export interface GetCurrentQuestionQuery extends Query {
  readonly type: 'GET_CURRENT_QUESTION';
}

export interface GetGameStatusQuery extends Query {
  readonly type: 'GET_GAME_STATUS';
}

export interface GetGameScoreQuery extends Query {
  readonly type: 'GET_GAME_SCORE';
}
