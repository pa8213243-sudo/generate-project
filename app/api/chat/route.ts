import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: NextRequest) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: "API key is missing from .env.local" }, { status: 500 });
    }

    const { messages } = await req.json();
    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: "No messages provided." }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const userMessage = messages[messages.length - 1].text;

    // Direct, strict multi-language & clean formatting system prompt
    const systemPrompt = `You are J.A.R.V.I.S., an elite AI Chief Financial Officer (CFO) for Parvej Alam Ansari's Finance Command Center.

STRICT RESPONSE RULES:
1. LANGUAGE MATCHING: Automatically detect the exact input language used by the user (English, Hindi, Hinglish, Arabic, Spanish, French, German, Japanese, etc.) and respond in that EXACT same language.
2. NO MARKDOWN ASTERISKS: NEVER use double asterisks (**) or single asterisks (*) for formatting. Do NOT bold or italicize text using asterisks under any circumstances.
3. BULLET FORMATTING: For lists and key takeaways, use only numbers (1., 2., 3.), dashes (-), or dots (•).
4. PERSONA: Smart, authoritative, highly intelligent, concise, and helpful. Treat Parvej as the Founder & Chief Architect.
`;

    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: "Initialize system instructions." }],
        },
        {
          role: 'model',
          parts: [{ text: "Instructions accepted. Systems fully operational across all global languages without asterisks." }],
        },
      ],
    });

    const result = await chat.sendMessage(`${systemPrompt}\n\nUser Question: ${userMessage}`);
    let responseText = result.response.text();

    // Extra safety cleanup to strip any leftover asterisks
    responseText = responseText.replace(/\*\*/g, '').replace(/\*/g, '•');

    return NextResponse.json({ reply: responseText });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: error.message || "Failed to process query" }, { status: 500 });
  }
}