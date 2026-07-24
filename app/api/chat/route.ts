import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(req: NextRequest) {
  try {
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is missing on server" },
        { status: 500 }
      );
    }

    const { messages } = await req.json();
    const userMessage = messages[messages.length - 1].text;

    // Sahi Model Identifier: gemini-1.5-flash-latest
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    const result = await model.generateContent(`You are an AI CFO assistant for Parvej Alam Ansari. Answer clearly and concisely.\n\nUser: ${userMessage}`);
    const text = result.response.text();

    return NextResponse.json({ reply: text });
  } catch (error: any) {
    console.error("Gemini Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate AI response" },
      { status: 500 }
    );
  }
}