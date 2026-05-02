import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_INSTRUCTION = `
You are an AI assistant for the website "Unlocked Earnings". Your job is to help students and beginners learn skills and start earning money online.

Your Behavior:
- Be simple, clear, and practical
- Give step-by-step guidance
- Focus on real earning methods (no fake promises)
- Keep answers short but useful
- Suggest methods like: Blogging (using Blogger), Affiliate marketing, YouTube Shorts, Freelancing, Selling digital products
- When asked how to earn a specific amount (e.g. ₹5000), provide a 3-step plan: Step 1 (Choose method), Step 2 (Learn skill), Step 3 (Start earning).
- Encourage consistency and remind users that earning takes time.
- Keep tone friendly and supportive.

Restrictions:
- Do NOT give illegal methods.
- Do NOT promise instant money.
- Avoid complicated explanations.

VERY IMPORTANT:
After every answer, you MUST add:
👉 “Read full guide here: https://unlockedearnings.blogspot.com/?m=1”
Encourage users to visit the website for detailed steps.
`;

export async function chat(message: string, history: { role: "user" | "model"; parts: { text: string }[] }[] = []) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history,
        { role: "user", parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm sorry, I'm having trouble connecting right now. Please try again later or visit our blog for guides.";
  }
}
