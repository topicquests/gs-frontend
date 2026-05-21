/**
 * Test setup for testing-library.
 * Configures Jest DOM matchers and sets up test environment.
 */
import '@testing-library/jest-dom';
import { vi } from 'vitest';

const localStorageMock = {
  store: {} as Record<string, string>,
  getItem: vi.fn((key) => localStorageMock.store[key] ?? null),
  setItem: vi.fn((key, value) => {
    localStorageMock.store[key] = value;
  }),
  removeItem: vi.fn((key) => {
    delete localStorageMock.store[key];
  }),
  clear: vi.fn(() => {
    localStorageMock.store = {};
  }),
  key: vi.fn(),
  get length() {
    return Object.keys(localStorageMock.store).length;
  },
};

Object.defineProperty(global, 'localStorage', {
  value: localStorageMock,
});
