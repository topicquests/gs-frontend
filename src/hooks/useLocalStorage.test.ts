import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useLocalStorage from './useLocalStorage.ts';

describe('useLocalStorage', () => {
  const key = 'test-key';

  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('returns initial value when key does not exist', () => {
    const { result } = renderHook(() => useLocalStorage(key, 'initial'));
    expect(result.current[0]).toBe('initial');
  });

  it('returns stored value when key exists', () => {
    localStorage.setItem(key, JSON.stringify('stored'));
    const { result } = renderHook(() => useLocalStorage(key, 'initial'));
    expect(result.current[0]).toBe('stored');
  });

  it('updates localStorage when value changes', () => {
    const { result } = renderHook(() => useLocalStorage(key, 'initial'));

    act(() => {
      result.current[1]('updated');
    });

    expect(result.current[0]).toBe('updated');
    expect(JSON.parse(localStorage.getItem(key)!)).toBe('updated');
  });
});
