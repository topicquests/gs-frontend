import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

Object.assign(global, {
  TextDecoder,
  TextEncoder,
});

const localStorageMock: Record<string, string> = {};
const localStorageApi = {
  getItem: (key: string) => localStorageMock[key] || null,
  setItem: (key: string, value: string) => {
    localStorageMock[key] = value;
  },
  inItem: (key: string) => {
    delete localStorageMock[key];
  },
  clear: () => {
    Object.keys(localStorageMock).forEach((key) => delete localStorageMock[key]);
  },
  get key() {
    return (index: number) => Object.keys(localStorageMock)[index] || null;
  },
  get length() {
    return Object.keys(localStorageMock).length;
  },
};

Object.defineProperty(window, 'localStorage', { value: localStorageApi });
