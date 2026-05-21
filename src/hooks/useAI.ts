/**
 * useAI hook for managing AI interactions.
 * Handles Socratic reasoning generation and Argdown conversion.
 */
import { useState } from 'react';
import { ideateReasoning, generateArgdown } from '../services/llmService.js';
import { Idea } from '../types.ts';

/**
 * Extracts error message from unknown error type.
 */
function getErrorMessage(e: unknown): string {
  const message = typeof e === 'string' ? e : (e as Error).message;
  return message || 'An unexpected error occurred';
}

export function useAI() {
  const [reasoning, setReasoning] = useState('');
  const [argdownText, setArgdownText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Generates Socratic reasoning and Argdown from user input.
   * Updates loading state and handles errors.
   */
  const ideate = async (question: string, inputText: string): Promise<void> => {
    if (!inputText.trim()) return;

    console.log('User clicked Ideate button');
    console.log('Input text:', inputText.substring(0, 100) + '.');

    setIsLoading(true);
    setError(null);
    try {
      const result = await ideateReasoning(question, inputText);
      setReasoning(result);
      console.log('Ideate successful');

      const argdown = await generateArgdown(question, inputText, result);
      setArgdownText(argdown);
      console.log('Argdown generation successful');
    } catch (e: unknown) {
      const message = getErrorMessage(e);
      setError(message);
      console.error('Ideate failed:', message);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Submits a new idea to the ideas list.
   * Creates a new Idea object with UUID and timestamp.
   */
  const submitIdea = (
    inputText: string,
    currentReasoning: string,
    ideas: Idea[],
    setIdeas: (ideas: Idea[]) => void
  ) => {
    if (!inputText.trim()) return;

    console.log('User clicked Submit button');
    console.log('Submitting idea:', inputText.substring(0, 100) + '.');
    const newIdea: Idea = {
      id: crypto.randomUUID(),
      text: inputText,
      reasoning: currentReasoning,
      timestamp: Date.now(),
    };
    setIdeas([newIdea, ...ideas]);
    setReasoning('');
    console.log('Idea submitted successfully, total ideas:', ideas.length + 1);
  };

  return { reasoning, argdownText, isLoading, error, ideate, submitIdea };
}
