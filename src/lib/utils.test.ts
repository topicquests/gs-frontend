import { describe, it, expect } from 'vitest';
import { clsxMerge } from './utils.ts';

describe('clsxMerge', () => {
  it('merges class names correctly', () => {
    const result = clsxMerge('px-2', 'py-4');
    expect(result).toBe('px-2 py-4');
  });

  it('handles conditional classes', () => {
    const showClass = true;
    const hideClass = false;
    const result = clsxMerge('px-2', showClass && 'py-4', hideClass && 'hidden');
    expect(result).toBe('px-2 py-4');
  });

  it('returns empty string for no classes', () => {
    const result = clsxMerge();
    expect(result).toBe('');
  });
});
