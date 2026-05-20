import { useState } from "react";
import { ideateReasoning, generateArgdown } from "../services/llmService.js";
import { Idea } from "../types.ts";

interface UseAIResult {
  reasoning: string;
  argdownText: string;
  isLoading: boolean;
  error: string | null;
  ideate: (question: string, inputText: string) => Promise<void>;
  submitIdea: (inputText: string, reasoning: string, ideas: Idea[], setIdeas: (ideas: Idea[]) => void) => void;
}

export function useAI() {
  const [reasoning, setReasoning] = useState("");
  const [argdownText, setArgdownText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const ideate = async (question: string, inputText: string): Promise<void> => {
    if (!inputText.trim()) return;

    console.log("User clicked Ideate button");
    console.log("Input text:", inputText.substring(0, 100) + ".");

    setIsLoading(true);
    setError(null);
    try {
      const result = await ideateReasoning(question, inputText);
      setReasoning(result);
      console.log("Ideate successful");

      const argdown = await generateArgdown(question, inputText, result);
      setArgdownText(argdown);
  console.log("Argdown generation successful");
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e);
      setError(message || "An unexpected error occurred");
      console.error("Ideate failed:", message);
    } finally {
      setIsLoading(false);
    }
  };

  const submitIdea = (
    inputText: string,
    currentReasoning: string,
    ideas: Idea[],
    setIdeas: (ideas: Idea[]) => void
  ) => {
    if (!inputText.trim()) return;

    console.log("User clicked Submit button");
    console.log("Submitting idea:", inputText.substring(0, 100) + ".");

    const newIdea: Idea = {
      id: crypto.randomUUID(),
      text: inputText,
      reasoning: currentReasoning,
      timestamp: Date.now()
    };
    setIdeas([newIdea, ...ideas]);
    setReasoning("");
    console.log("Idea submitted successfully, total ideas:", ideas.length + 1);
  };

  return { reasoning, argdownText, isLoading, error, ideate, submitIdea };
}
