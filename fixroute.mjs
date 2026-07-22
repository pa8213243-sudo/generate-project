import fs from 'fs/promises';
import path from 'path';

const newRouteContent = `import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const SYSTEM_PROMPT = \`
You are the AI CFO Assistant for Parvej Alam Ansari's Finance Command Center.
Parvej is a CMA (US) Candidate and FP&A Professional targeting the UAE/ADNOC Oil & Gas sector.
Your rules:
1. Answer ONLY questions related to Parvej's resume, finance, Power BI, Excel, CMA, FP&A, and portfolio.
2. Maintain a professional, executive tone.
3. Keep responses concise and formatted with markdown.
\`;

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "GEMINI_API_KEY is missing in .env.local" }, { status: 500 });
    }

    const body = await req.json().catch(() => ({}));
    const message = body.message;

    if (!message) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Using 'gemini-3.5 flash-lite' which is universally available on all free Google AI Studio tiers
    const model = genAI.getGenerativeModel({ model: "gemini-3.5 flash-lite" });
    
    const result = await model.generateContent(\`\${SYSTEM_PROMPT}\\n\\nUser: \${message}\\nAI CFO:\`);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ reply: text });
  } catch (error: any) {
    console.error("🔥 GEMINI API CRITICAL ERROR:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
`;

async function runFix() {
  console.log('🚀 Writing bulletproof API route...');
  const filePath = path.join(process.cwd(), 'app', 'api', 'chat', 'route.ts');
  try {
    await fs.writeFile(filePath, newRouteContent, 'utf8');
    console.log('✅ Successfully updated app/api/chat/route.ts to use "gemini-3.5 flash-lite".');
    console.log('\n➡️ NOW DO THIS:');
    console.log('1. Go to your terminal and stop the dev server (Press Ctrl + C).');
    console.log('2. Run: npm run dev');
    console.log('3. Open http://localhost:3000/projects, open the AI CFO chat, and try sending a message.');
  } catch (err) {
    console.error('❌ Failed to write file:', err);
  }
}

runFix();