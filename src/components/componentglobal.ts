export { RomanticButton } from './RomanticButton';
export { QuestionCard } from './QuestionCard';

export const ComponentRegistry = {
  RomanticButton: () => import('./RomanticButton').then(m => m.RomanticButton),
  QuestionCard: () => import('./QuestionCard').then(m => m.QuestionCard),
} as const;

export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface InteractiveComponentProps extends BaseComponentProps {
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}