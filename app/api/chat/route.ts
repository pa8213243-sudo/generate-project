import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs'; // Ensures Node.js execution on Netlify

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not configured on the server." },
        { status: 500 }
      );
    }

    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "No messages provided." },
        { status: 400 }
      );
    }

    const userMessage = messages[messages.length - 1].text;

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const systemPrompt = `You are J.A.R.V.I.S., an elite AI Chief Financial Officer (CFO) and executive assistant for Parvej Alam Ansari's Finance Command Center.

STRICT INSTRUCTIONS:
1. DETECT LANGUAGE: Automatically detect the input language (English, Hindi, Hinglish, Arabic, Spanish, etc.) and respond in the EXACT same language.
2. NO MARKDOWN ASTERISKS: NEVER use double asterisks (**) or single asterisks (*) anywhere in the text.
3. BULLETS & NUMBERS: Use numbers (1., 2., 3.) or dashes (-) for list items.
4. PERSONA: Intelligent, concise, quantitative, and professional. Treat Parvej as the Founder & Chief Architect.`;

    const promptText = `${systemPrompt}\n\nUser Question: ${userMessage}`;
    const result = await model.generateContent(promptText);
    
    let text = result.response.text();
    // Strip any markdown asterisks completely
    text = text.replace(/\*\*/g, '').replace(/\*/g, '•');

    return NextResponse.json({ reply: text });
  } catch (error: any) {
    console.error("Gemini Route Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}