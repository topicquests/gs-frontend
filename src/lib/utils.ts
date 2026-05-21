/**
 * Utility functions for the application.
 * Uses clsx and tailwind-merge for efficient CSS class composition.
 */
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges class names with Tailwind CSS optimizations.
 * Automatically handles conditional classes and removes duplicates.
 */
export function clsxMerge(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
