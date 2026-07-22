import fs from 'fs/promises';
import path from 'path';

const aiCfoCode = `"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Sparkles, Copy, RotateCcw, ShieldAlert, Loader2 } from 'lucide-react';

export default function AICFOPage() {
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Welcome to the AI CFO Command Hub. I am your advanced financial assistant, powered by Gemini 1.5 Pro.\\n\\nHow can I assist you with financial modeling, UAE market analysis, or strategic planning today?" }
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

  const simulateStreamingResponse = (userText: string) => {
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      const aiResponse = \`Analyzing financial parameters for: "\${userText}"...\\n\\nBased on current market data, macroeconomic indicators, and standard FP&A practices, here is the breakdown:\\n\\n1. **Strategic Impact:** The metrics indicate a strong correlation with recent shifts in the global energy sector.\\n2. **Variance Analysis:** We need to adjust our predictive models to account for a 4.2% standard deviation.\\n3. **Recommendation:** I suggest updating the DCF model assumptions before presenting to the board.\\n\\n*(Note: This is a fully functional UI shell. Connect your Gemini API Key in the backend for real-time live data generation.)*\`;
      
      setMessages(prev => [...prev, { role: 'ai', text: '' }]);
      
      let i = 0;
      const interval = setInterval(() => {
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].text += aiResponse.charAt(i);
          return newMessages;
        });
        i++;
        if (i === aiResponse.length - 1) {
          clearInterval(interval);
        }
      }, 15); // 15ms per character for smooth streaming
    }, 1000);
  };

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    
    simulateStreamingResponse(userMsg);
  };

  const suggestedPrompts = [
    "Analyze ADNOC's recent expansion strategies in the UAE.",
    "Build a 5-year FP&A forecasting model template.",
    "Explain advanced variance analysis for CMA US Part 2.",
    "Summarize the impact of global oil prices on tech equities."
  ];

  return (
    <div className="w-full h-full min-h-screen bg-[#02040A] text-white p-6 lg:p-10 flex flex-col max-w-[1600px] mx-auto">
      
      {/* Header */}
      <div className="mb-6 flex-shrink-0">
        <h1 className="text-4xl font-black font-space text-white mb-2 flex items-center gap-3">
          <Bot className="w-8 h-8 text-accent" /> AI CFO Command Hub
        </h1>
        <p className="text-white/50 font-mono text-sm flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" /> Full-screen Gemini API Financial Assistant.
        </p>
      </div>

      {/* Main Chat Interface */}
      <div className="flex-1 bg-[#0B1120] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden relative">
        
        {/* Chat History Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
          {messages.map((msg, idx) => (
            <div key={idx} className={\`flex gap-4 max-w-4xl \${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}\`}>
              
              {/* Avatar */}
              <div className={\`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg \${msg.role === 'ai' ? 'bg-[#050816] text-accent border border-accent/30' : 'bg-primary/20 text-primary border border-primary/30'}\`}>
                {msg.role === 'ai' ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
              </div>
              
              {/* Message Bubble */}
              <div className={\`p-5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap \${msg.role === 'user' ? 'bg-primary/10 border border-primary/20 text-white shadow-[0_0_15px_rgba(59,130,246,0.1)]' : 'bg-[#050816] border border-white/5 text-white/90 shadow-inner'}\`}>
                {msg.text}
                
                {/* Action Buttons for AI Responses */}
                {msg.role === 'ai' && msg.text.length > 0 && (
                  <div className="mt-4 flex items-center gap-4 border-t border-white/10 pt-3">
                    <button className="text-white/40 hover:text-accent transition-colors flex items-center gap-1.5 text-[11px] font-mono"><Copy className="w-3 h-3"/> COPY</button>
                    <button className="text-white/40 hover:text-accent transition-colors flex items-center gap-1.5 text-[11px] font-mono"><RotateCcw className="w-3 h-3"/> RETRY</button>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {/* Loading State */}
          {isTyping && (
            <div className="flex gap-4 max-w-4xl">
              <div className="w-10 h-10 rounded-xl bg-[#050816] text-accent border border-accent/30 flex items-center justify-center flex-shrink-0 shadow-lg">
                <Loader2 className="w-5 h-5 animate-spin" />
              </div>
              <div className="p-5 rounded-2xl bg-[#050816] border border-white/5 text-accent text-sm flex items-center gap-3 font-mono shadow-inner">
                <Sparkles className="w-4 h-4 animate-pulse" /> Processing financial node...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-6 bg-[#050816] border-t border-white/10">
          
          {/* Suggested Prompts (Only show at the beginning) */}
          {messages.length === 1 && (
            <div className="flex flex-wrap gap-3 mb-5">
              {suggestedPrompts.map(prompt => (
                <button 
                  key={prompt} 
                  onClick={() => { setInput(prompt); }} 
                  className="text-[11px] font-mono text-accent bg-accent/5 border border-accent/20 px-4 py-2 rounded-full hover:bg-accent hover:text-black hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Form */}
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
              className="absolute right-3 p-2.5 bg-accent hover:bg-cyan-300 text-black rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_10px_rgba(34,211,238,0.3)]"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          
          <div className="text-center mt-4 text-[10px] font-mono text-white/30 flex items-center justify-center gap-1.5">
            <ShieldAlert className="w-3 h-3" /> AI CFO may produce inaccurate information regarding live market data. Always verify facts.
          </div>
        </div>
      </div>
    </div>
  );
}`;

async function fixAiCfoPage() {
  try {
    const targetPath = path.join(process.cwd(), 'app/ai-cfo/page.tsx');
    await fs.mkdir(path.dirname(targetPath), { recursive: true });
    await fs.writeFile(targetPath, aiCfoCode, 'utf8');
    console.log('✅ BINGO! Full-Screen AI CFO Chat Interface Deployed!');
  } catch (err) {
    console.error('❌ Error updating file:', err);
  }
}

fixAiCfoPage();