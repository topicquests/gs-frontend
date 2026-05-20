import OpenAI from "openai";

console.log('LLM Service initializing...');
console.log('OPENAI_HOST:', import.meta.env.VITE_OPENAI_HOST || 'Not set');
console.log('Using model:', import.meta.env.VITE_OPENAI_MODEL);

const client = new OpenAI({
  baseURL: import.meta.env.VITE_OPENAI_HOST,
  apiKey: "ollama",
  dangerouslyAllowBrowser: true,
});

const openaiHost = import.meta.env.VITE_OPENAI_HOST;
const openaiModel = import.meta.env.VITE_OPENAI_MODEL;
const model = openaiModel;

console.log('LLM Service Configuration:');
console.log('OPENAI_HOST:', openaiHost || 'Not configured (will use default Ollama endpoint)');
console.log('OPENAI_MODEL:', model);
console.log('Environment variables loaded successfully');

export async function ideateReasoning(question: string, userIdea: string): Promise<string> {
  console.log('=== Socratic Reasoning Request ===');
  console.log('Input question:', question.substring(0, 80) + '...');
  console.log('Input user idea:', userIdea.substring(0, 80) + '...');
  console.log('Using model:', model);
  console.log('===============================');

  const prompt = `
    Question: ${question}
    User Idea: ${userIdea}

    Using Socratic reasoning, analyze this idea in the context of the question.
    Provide 3 insightful, challenging, and constructive questions or points that stimulate further thought.
    Format your response as a list of bullet points starting with "- ".
    At the end, include 1 or 2 citations from relevant hypothetical or real research in the format [1] Title: URL.
  `;

  console.log('Starting Socratic reasoning generation for question:', question.substring(0, 80) + '...');
  console.log('Using model:', model);

  try {
    const response = await client.chat.completions.create({
      model,
      messages: [{ role: "user", content: prompt }],
    });
    const content = response.choices[0]?.message?.content ?? "";
    console.log('Argdown generation completed successfully');
    console.log('Generated graph preview:', content.substring(0, 100) + '...');
    return content;
  } catch (error) {
    console.error("LLM Error:", error);
    console.error('Detailed error:', error instanceof Error ? error.message : String(error));
    throw new Error("Failed to generate discourse graph. Please try again.");
  }
}

export async function generateArgdown(question: string, userIdea: string, reasoning: string): Promise<string> {
  console.log('=== Argdown Generation Request ===');
  console.log('Input question:', question.substring(0, 80) + '...');
  console.log('Input user idea:', userIdea.substring(0, 80) + '...');
  console.log('Input reasoning:', reasoning.substring(0, 80) + '...');
  console.log('===============================');

  const prompt = `
    Question: ${question}
    User Idea: ${userIdea}
    Socratic Reasoning: ${reasoning}

    Convert the above into an argdown structure suitable for visualizing a discourse graph.
    Include nodes for the original question, the user's idea, and each point of reasoning as separate entities.
    Use proper argdown syntax with node definitions and connections.
  `;

  console.log('Starting argdown generation');

  try {
    const response = await client.chat.completions.create({
      model,
      messages: [{ role: "user", content: prompt }],
    });
    const content = response.choices[0]?.message?.content ?? "";
    console.log('Argdown generation completed successfully');
    console.log('Generated argdown preview:', content.substring(0, 100) + '...');
    return content;
  } catch (error) {
    console.error("LLM Error:", error);
    console.error('Detailed error:', error instanceof Error ? error.message : String(error));
    throw new Error("Failed to generate argdown. Please try again.");
  }
}