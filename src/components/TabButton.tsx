/**
 * TabButton component.
 * Navigation button for switching between tabs.
 * Shows active state with indigo border and text.
 */
import { clsxMerge } from '../lib/utils.ts';

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  label: string;
}

export default function TabButton({ active, onClick, label }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={clsxMerge(
        'px-2 h-full transition-all border-b-2 font-medium relative flex items-center',
        active
          ? 'border-primary-dark text-primary-dark font-semibold dark:border-primary-dark/70 dark:text-primary-dark/70'
          : 'border-transparent text-secondary-light hover:text-text-light dark:text-secondary-dark dark:hover:text-text-dark'
      )}
    >
      {label}
    </button>
  );
}
