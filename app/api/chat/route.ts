import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(req: NextRequest) {
  try {
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is missing on Netlify server" },
        { status: 500 }
      );
    }

    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "No user message provided" }, { status: 400 });
    }

    const userMessage = messages[messages.length - 1].text;
    const prompt = `You are J.A.R.V.I.S., an elite AI CFO assistant for Parvej Alam Ansari. Answer clearly, accurately, and concisely in the same language as the user.\n\nUser Question: ${userMessage}`;

    // List of official Google Gemini models to try automatically
    const modelsToTry = [
      "gemini-1.5-flash",
      "gemini-1.5-pro",
      "gemini-2.0-flash-exp",
      "gemini-pro"
    ];

    let responseText = "";
    let lastError = null;

    for (const modelName of modelsToTry) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent(prompt);
        responseText = result.response.text();
        if (responseText) break; // Success! Stop checking further models
      } catch (err: any) {
        lastError = err;
        console.warn(`Model ${modelName} returned error, falling back to next...`);
      }
    }

    if (!responseText) {
      throw lastError || new Error("All valid Gemini models failed to respond");
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