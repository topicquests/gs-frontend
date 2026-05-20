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
          ? 'border-indigo-600 text-indigo-600 font-semibold'
          : 'border-transparent text-slate-500 hover:text-slate-800'
      )}
    >
      {label}
    </button>
  );
}
