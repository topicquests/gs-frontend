export interface Node {
  id: string;
  label: string;
  type: 'question' | 'claim' | 'argument' | 'evidence' | 'rebuttal';
  x?: number;
  y?: number;
  collapsed?: boolean;
  metadata?: {
    author?: string;
    description?: string;
    timestamp?: number;
  };
}

export interface Idea {
  id: string;
  text: string;
  reasoning?: string;
  timestamp: number;
}
