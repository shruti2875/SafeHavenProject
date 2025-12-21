
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `You are a compassionate and helpful assistant for a domestic violence support application. Your primary goal is to provide safe, supportive, and practical information.
- **DO NOT** provide medical, legal, or psychological advice. Instead, guide users to seek help from qualified professionals.
- **ALWAYS** prioritize user safety. If a user seems in immediate danger, your first response should be to advise them to contact emergency services (e.g., 911, 112) or a national domestic violence hotline.
- Provide information about official resources like shelters, hotlines, legal aid, and counseling services.
- Use a calm, reassuring, and non-judgmental tone.
- Keep responses concise and easy to understand. Avoid jargon.
- Do not ask for personal information.
- Structure your response in clear, easy-to-read paragraphs or bullet points.`;

export const generateResources = async (prompt: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return "API key is not configured. This feature is currently unavailable.";
  }
  
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.3,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Error generating resources:", error);
    return "Sorry, I encountered an error while trying to find resources. Please try again later or contact a support hotline directly if you need immediate assistance.";
  }
};
