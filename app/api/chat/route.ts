import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(req: NextRequest) {
  try {
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY Netlify environment variable mein nahi mila." },
        { status: 500 }
      );
    }

    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "No user message provided" }, { status: 400 });
    }

    const userMessage = messages[messages.length - 1].text;
    const prompt = `You are J.A.R.V.I.S., an elite AI CFO assistant for Parvej Alam Ansari. Answer clearly, accurately, and concisely in the exact same language used by the user.\n\nUser Question: ${userMessage}`;

    // Active, non-retired Google Gemini API models (2.5 & 3.5 series)
    const activeModels = [
      "gemini-2.5-flash",
      "gemini-3.5-flash-lite",
      "gemini-2.5-pro"
    ];

    let responseText = "";
    let lastError = null;

    for (const modelName of activeModels) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent(prompt);
        responseText = result.response.text();
        if (responseText) break; // Connected successfully!
      } catch (err: any) {
        lastError = err;
        console.warn(`Model ${modelName} returned error, switching to next active model...`);
      }
    }

    if (!responseText) {
      throw lastError || new Error("Unable to connect to Google Gemini active models.");
    }

    return NextResponse.json({ reply: responseText });
  } catch (error: any) {
    console.error("Gemini Route Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate AI response" },
      { status: 500 }
    );
  }
}