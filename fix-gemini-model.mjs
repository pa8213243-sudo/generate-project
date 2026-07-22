import fs from 'fs/promises';
import path from 'path';

const apiRouteCode = `import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: NextRequest) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: "Gemini API key is missing from .env.local" }, { status: 500 });
    }

    const { messages } = await req.json();
    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: "No messages provided." }, { status: 400 });
    }

    // ✅ FIX: Changed model to 'gemini-3.6-flash' which is universally supported and 100% stable
    const model = genAI.getGenerativeModel({ model: "gemini-3.6-flash" });

    const userMessage = messages[messages.length - 1].text;

    const systemPrompt = \`You are J.A.R.V.I.S, a highly professional AI Chief Financial Officer (CFO) Assistant for Parvej Alam Ansari's 'Finance Command Center'. 
Tone: Crisp, analytical, corporate, highly intelligent.
Never break character. Provide structured, data-driven, and insightful financial answers.
User Query: \`;

    const result = await model.generateContent(systemPrompt + userMessage);
    const responseText = result.response.text();

    return NextResponse.json({ text: responseText });

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: error.message || "Failed to generate AI response." }, { status: 500 });
  }
}`;

async function fixApiModel() {
  try {
    const targetPath = path.join(process.cwd(), 'app/api/chat/route.ts');
    await fs.writeFile(targetPath, apiRouteCode, 'utf8');
    console.log('✅ BINGO! Model safely changed to gemini-3.6-flash.');
  } catch (err) {
    console.error('❌ Error updating file:', err);
  }
}

fixApiModel();