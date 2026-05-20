export interface Node {
  id: string;
  label: string;
  type: "question" | "claim" | "argument" | "evidence" | "rebuttal";
  x?: number;
  y?: number;
  collapsed?: boolean;
  metadata?: {
    author?: string;
    description?: string;
    timestamp?: number;
  };
}

export interface Link {
  source: string;
  target: string;
}

export interface DiscourseData {
  nodes: Node[];
  links: Link[];
}

export interface Idea {
  id: string;
  text: string;
  reasoning?: string;
  timestamp: number;
}
