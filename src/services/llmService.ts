/**
 * LLM service for interacting with OpenAI-compatible APIs.
 * Provides functions for Socratic reasoning and Argdown generation.
 */
import OpenAI from 'openai';
import { IDEATE_REASONING_PROMPT, GENERATE_ARGWDOWN_PROMPT } from '../prompts.js';

const model = import.meta.env.VITE_OPENAI_MODEL || 'gpt-oss:20b';

const client = new OpenAI({
  baseURL: import.meta.env.VITE_OPENAI_HOST,
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || 'ollama',
  dangerouslyAllowBrowser: true,
});

/**
 * Logs LLM request details for debugging.
 */
function logRequest(endpoint: string, messages: Array<{ role: string; content: string }>) {
  console.log(
    `[LLM Request] ${endpoint}`,
    JSON.stringify(
      {
        model,
        messages: messages.map((m) => ({
          role: m.role,
          content: m.content.substring(0, 100) + '. ..',
        })),
      },
      null,
      2
    )
  );
}

/**
 * Logs LLM response details for debugging.
 */
function logResponse(endpoint: string, content: string) {
  console.log(
    `[LLM Response] ${endpoint}`,
    JSON.stringify(
      {
        content: content.substring(0, 200) + (content.length > 200 ? '. ..' : ''),
      },
      null,
      2
    )
  );
}

/**
 * Generates Socratic reasoning questions based on a question and user idea.
 * Returns formatted bullet points with citations.
 */
export async function ideateReasoning(question: string, userIdea: string): Promise<string> {
  console.log('[LLM] Starting Socratic reasoning generation');
  const prompt = IDEATE_REASONING_PROMPT(question, userIdea);

  try {
    logRequest('ideateReasoning', [{ role: 'user', content: prompt }]);
    const response = await client.chat.completions.create({
      model,
      messages: [{ role: 'user', content: prompt }],
    });
    const content = response.choices[0]?.message?.content ?? '';
    logResponse('ideateReasoning', content);
    console.log('[LLM] Socratic reasoning completed successfully');
    return content;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('[LLM Error] ideateReasoning:', error);
    throw new Error(`Failed to generate discourse graph: ${message}`, { cause: error });
  }
}

/**
 * Converts question, idea, and reasoning into Argdown format for graph visualization.
 */
export async function generateArgdown(
  question: string,
  userIdea: string,
  reasoning: string
): Promise<string> {
  console.log('[LLM] Starting Argdown generation');
  const prompt = GENERATE_ARGWDOWN_PROMPT(question, userIdea, reasoning);

  try {
    logRequest('generateArgdown', [{ role: 'user', content: prompt }]);
    const response = await client.chat.completions.create({
      model,
      messages: [{ role: 'user', content: prompt }],
    });
    const content = response.choices[0]?.message?.content ?? '';
    logResponse('generateArgdown', content);
    console.log('[LLM] Argdown generation completed successfully');
    return content;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('[LLM Error] generateArgdown:', error);
    throw new Error(`Failed to generate argdown: ${message}`, { cause: error });
  }
}
