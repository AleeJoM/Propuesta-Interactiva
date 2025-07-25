// Re-export all shared components
export { RomanticButton } from './RomanticButton';
export { QuestionCard } from './QuestionCard';

// Component registry for lazy loading
export const ComponentRegistry = {
  RomanticButton: () => import('./RomanticButton').then(m => m.RomanticButton),
  QuestionCard: () => import('./QuestionCard').then(m => m.QuestionCard),
};

// Global component props types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface InteractiveComponentProps extends BaseComponentProps {
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}