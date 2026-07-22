import fs from 'fs/promises';
import path from 'path';

const miniCfoCode = `"use client";
import React, { useState } from 'react';
import { Bot, Send, Sparkles } from 'lucide-react';
import Link from 'next/link';

export const EmbeddedAICFO = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'ai', text: "J.A.R.V.I.S: Hi Parvej! I'm your AI CFO Assistant for the Finance Command Center. Target protocols online." }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;
    
    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: "Analyzing local data parameters... For deep financial modeling and full system access, please open the main AI CFO workspace." 
      }]);
    }, 1200);
  };

  return (
    <div className="rounded-2xl bg-[#0B1120] border border-white/10 p-5 shadow-xl flex flex-col h-full relative overflow-hidden min-h-[240px]">
      
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-[40px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <h3 className="text-xs font-space font-bold text-white tracking-widest uppercase flex items-center gap-2">
          <Bot className="w-4 h-4 text-accent" /> AI CFO ASSISTANT
        </h3>
        <Link href="/ai-cfo" className="text-[9px] font-mono bg-accent/10 text-accent border border-accent/20 px-2 py-1 rounded-md flex items-center gap-1 hover:bg-accent hover:text-black transition-all shadow-[0_0_10px_rgba(34,211,238,0.1)]">
          <Sparkles className="w-3 h-3" /> Gemini 1.5 Pro
        </Link>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-3 custom-scrollbar pr-2 relative z-10 flex flex-col">
        {messages.map((msg, i) => (
          <div key={i} className={\`text-[11px] font-mono leading-relaxed p-3 rounded-xl shadow-md \${msg.role === 'ai' ? 'text-accent bg-[#050816] border border-accent/20 self-start mr-4' : 'text-white bg-primary/20 border border-primary/30 self-end ml-4'}\`}>
            {msg.text}
          </div>
        ))}
        {isTyping && (
          <div className="text-[11px] font-mono text-accent/50 bg-[#050816] border border-white/5 p-3 rounded-xl animate-pulse self-start mr-4 flex items-center gap-2">
            <Sparkles className="w-3 h-3 animate-spin" /> Processing...
          </div>
        )}
      </div>

      {/* Input Area */}
      <form onSubmit={handleSend} className="relative mt-auto z-10">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask AI CFO..."
          className="w-full bg-[#050816] border border-white/10 rounded-lg pl-3 pr-10 py-2.5 text-xs text-white outline-none focus:border-accent/50 focus:shadow-[0_0_10px_rgba(34,211,238,0.2)] transition-all font-mono"
        />
        <button
          type="submit"
          disabled={!input.trim() || isTyping}
          className="absolute right-1.5 top-1.5 p-1.5 bg-accent text-black rounded hover:bg-cyan-300 transition-all disabled:opacity-50 disabled:scale-95"
        >
          <Send className="w-3 h-3" />
        </button>
      </form>
    </div>
  );
};`;

async function fixMiniCFO() {
  try {
    const targetPath = path.join(process.cwd(), 'components/dashboard/EmbeddedAICFO.tsx');
    await fs.mkdir(path.dirname(targetPath), { recursive: true });
    await fs.writeFile(targetPath, miniCfoCode, 'utf8');
    console.log('✅ BINGO! Dashboard Mini AI CFO is now fully interactive!');
  } catch (err) {
    console.error('❌ Error updating file:', err);
  }
}

fixMiniCFO();