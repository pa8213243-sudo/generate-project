import fs from 'fs/promises';
import path from 'path';

const files = [
  // ==========================================
  // 1. STABLE BACKEND API ROUTE
  // ==========================================
  {
    path: 'app/api/chat/route.ts',
    content: `import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

// Removed edge runtime, using standard Node.js which is much more stable in Next 14 locally
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

    // Using gemini-3.6-flash
    const model = genAI.getModel({ model: "gemini-3.6-flash" });

    // Get the last user message
    const userMessage = messages[messages.length - 1].text;

    const systemPrompt = \`You are J.A.R.V.I.S, a highly professional AI Chief Financial Officer (CFO) Assistant for Parvej Alam Ansari's 'Finance Command Center'. 
Tone: Crisp, analytical, corporate, highly intelligent.
Never break character. 
User Query: \`;

    // Standard non-streaming call first to guarantee it works without crashing Next.js
    const result = await model.generateContent(systemPrompt + userMessage);
    const responseText = result.response.text();

    return NextResponse.json({ text: responseText });

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: error.message || "Failed to generate AI response." }, { status: 500 });
  }
}`
  },

  // ==========================================
  // 2. FULL-SCREEN AI CFO (Updated for Stable JSON)
  // ==========================================
  {
    path: 'app/ai-cfo/page.tsx',
    content: `"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Sparkles, Copy, RotateCcw, ShieldAlert, Loader2 } from 'lucide-react';

export default function AICFOPage() {
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Welcome to the AI CFO Command Hub. I am J.A.R.V.I.S, your advanced financial assistant powered by Gemini 1.5.\\n\\nHow can I assist you with financial modeling, strategic planning, or market analysis today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg = input;
    setInput('');
    const newMessages = [...messages, { role: 'user', text: userMsg }];
    setMessages(newMessages);
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'API response was not ok');

      setMessages(prev => [...prev, { role: 'ai', text: data.text }]);
      setIsTyping(false);

    } catch (error: any) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'ai', text: \`System Error: \${error.message || "Unable to establish connection to Gemini protocols."}\` }]);
      setIsTyping(false);
    }
  };

  const suggestedPrompts = [
    "Analyze ADNOC's recent expansion strategies in the UAE.",
    "Build a 5-year FP&A forecasting model template.",
    "Explain advanced variance analysis for CMA US Part 2.",
    "What are the key KPIs for an e-commerce platform?"
  ];

  return (
    <div className="w-full h-full min-h-screen bg-[#02040A] text-white p-6 lg:p-10 flex flex-col max-w-[1600px] mx-auto">
      <div className="mb-6 flex-shrink-0">
        <h1 className="text-4xl font-black font-space text-white mb-2 flex items-center gap-3">
          <Bot className="w-8 h-8 text-accent" /> AI CFO Command Hub
        </h1>
        <p className="text-white/50 font-mono text-sm flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" /> Connected: Live Gemini 1.5 API Integration
        </p>
      </div>

      <div className="flex-1 bg-[#0B1120] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden relative">
        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
          {messages.map((msg, idx) => (
            <div key={idx} className={\`flex gap-4 max-w-4xl \${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}\`}>
              <div className={\`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg \${msg.role === 'ai' ? 'bg-[#050816] text-accent border border-accent/30' : 'bg-primary/20 text-primary border border-primary/30'}\`}>
                {msg.role === 'ai' ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
              </div>
              <div className={\`p-5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap \${msg.role === 'user' ? 'bg-primary/10 border border-primary/20 text-white shadow-[0_0_15px_rgba(59,130,246,0.1)]' : 'bg-[#050816] border border-white/5 text-white/90 shadow-inner'}\`}>
                {msg.text}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-4 max-w-4xl">
              <div className="w-10 h-10 rounded-xl bg-[#050816] text-accent border border-accent/30 flex items-center justify-center flex-shrink-0 shadow-lg">
                <Loader2 className="w-5 h-5 animate-spin" />
              </div>
              <div className="p-5 rounded-2xl bg-[#050816] border border-white/5 text-accent text-sm flex items-center gap-3 font-mono shadow-inner">
                <Sparkles className="w-4 h-4 animate-pulse" /> Establishing secure link to Gemini...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-6 bg-[#050816] border-t border-white/10">
          {messages.length === 1 && (
            <div className="flex flex-wrap gap-3 mb-5">
              {suggestedPrompts.map(prompt => (
                <button 
                  key={prompt} 
                  onClick={() => { 
                    setInput(prompt); 
                    setTimeout(() => handleSend({ preventDefault: () => {} } as any), 100); 
                  }} 
                  className="text-[11px] font-mono text-accent bg-accent/5 border border-accent/20 px-4 py-2 rounded-full hover:bg-accent hover:text-black transition-all text-left"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          <form onSubmit={handleSend} className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask finance questions, run quick analyses, or prompt the AI CFO..."
              className="w-full bg-[#0B1120] border border-white/10 rounded-xl pl-5 pr-14 py-4 text-sm text-white outline-none focus:border-accent/50 focus:shadow-[0_0_20px_rgba(34,211,238,0.1)] transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="absolute right-3 p-2.5 bg-accent hover:bg-cyan-300 text-black rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}`
  },

  // ==========================================
  // 3. MINI AI CFO WIDGET (Updated for Stable JSON)
  // ==========================================
  {
    path: 'components/dashboard/EmbeddedAICFO.tsx',
    content: `"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Sparkles } from 'lucide-react';
import Link from 'next/link';

export const EmbeddedAICFO = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'ai', text: "J.A.R.V.I.S: Hi Parvej! Secure link established. I'm ready to analyze financial queries." }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;
    
    const userText = input;
    setInput('');
    const newMessages = [...messages, { role: 'user', text: userText }];
    setMessages(newMessages);
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'API response was not ok');

      setMessages(prev => [...prev, { role: 'ai', text: data.text }]);
      setIsTyping(false); 

    } catch (error: any) {
      setMessages(prev => [...prev, { role: 'ai', text: \`Connection error: \${error.message}\` }]);
      setIsTyping(false);
    }
  };

  return (
    <div className="rounded-2xl bg-[#0B1120] border border-white/10 p-5 shadow-xl flex flex-col h-full relative overflow-hidden min-h-[240px]">
      <div className="flex items-center justify-between mb-4 relative z-10">
        <h3 className="text-xs font-space font-bold text-white tracking-widest uppercase flex items-center gap-2">
          <Bot className="w-4 h-4 text-accent" /> AI CFO ASSISTANT
        </h3>
        <Link href="/ai-cfo" className="text-[9px] font-mono bg-accent/10 text-accent border border-accent/20 px-2 py-1 rounded-md flex items-center gap-1 hover:bg-accent hover:text-black transition-all">
          <Sparkles className="w-3 h-3" /> Live
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto mb-4 space-y-3 custom-scrollbar pr-2 relative z-10 flex flex-col">
        {messages.map((msg, i) => (
          <div key={i} className={\`text-[11px] font-mono leading-relaxed p-3 rounded-xl shadow-md whitespace-pre-wrap \${msg.role === 'ai' ? 'text-accent bg-[#050816] border border-accent/20 self-start mr-4' : 'text-white bg-primary/20 border border-primary/30 self-end ml-4'}\`}>
            {msg.text}
          </div>
        ))}
        {isTyping && (
          <div className="text-[11px] font-mono text-accent/50 bg-[#050816] border border-white/5 p-3 rounded-xl animate-pulse self-start mr-4 flex items-center gap-2">
            <Sparkles className="w-3 h-3 animate-spin" /> Processing...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className="relative mt-auto z-10">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask AI CFO..."
          className="w-full bg-[#050816] border border-white/10 rounded-lg pl-3 pr-10 py-2.5 text-xs text-white outline-none focus:border-accent/50 transition-all font-mono"
        />
        <button
          type="submit"
          disabled={!input.trim() || isTyping}
          className="absolute right-1.5 top-1.5 p-1.5 bg-accent text-black rounded hover:bg-cyan-300 transition-all disabled:opacity-50"
        >
          <Send className="w-3 h-3" />
        </button>
      </form>
    </div>
  );
};`
  }
];

async function deployStableGemini() {
  for (const file of files) {
    const fullPath = path.join(process.cwd(), file.path);
    await fs.mkdir(path.dirname(fullPath), { recursive: true });
    await fs.writeFile(fullPath, file.content, 'utf8');
    console.log(`✅ Stable Code Deployed: ${file.path}`);
  }
}

deployStableGemini();