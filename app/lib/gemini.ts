import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key as an environment variable (see .env.local file)
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!);

export async function generateContent(prompt: string): Promise<string> {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
}
