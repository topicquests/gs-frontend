export const IDEATE_REASONING_PROMPT = (question: string, userIdea: string): string => `
Question: ${question}
User Idea: ${userIdea}

Using Socratic reasoning, analyze this idea in the context of the question.
Provide 3 insightful, challenging, and constructive questions or points that stimulate further thought.
Format your response as a list of bullet points starting with "- ".
At the end, include 1 or 2 citations from relevant hypothetical or real research in the format [1] Title: URL.
`;

export const GENERATE_ARGWDOWN_PROMPT = (question: string, userIdea: string, reasoning: string): string => `
Question: ${question}
User Idea: ${userIdea}
Socratic Reasoning: ${reasoning}

Convert the above into an argdown structure suitable for visualizing a discourse graph.
Include nodes for the original question, the user's idea, and each point of reasoning as separate entities.
Use proper argdown syntax with node definitions and connections.
`;
