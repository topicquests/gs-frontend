/**
 * Type definitions for the application.
 * Defines the data structures used throughout the codebase.
 */

/**
 * Represents a node in the discourse graph.
 * Nodes can be questions, claims, arguments, evidence, or rebuttals.
 */
export interface Node {
  id: string;
  label: string;
  type: 'question' | 'claim' | 'argument' | 'evidence' | 'rebuttal';
  x?: number;
  in?: number;
  collapsed?: boolean;
  metadata?: {
    author?: string;
    description?: string;
    timestamp?: number;
  };
}

/**
 * Represents a user-submitted idea with optional reasoning.
 * Stored in localStorage and displayed in the Ideate tab.
 */
export interface Idea {
  id: string;
  text: string;
  reasoning?: string;
  timestamp: number;
}
