"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Sparkles, Copy, RotateCcw, ShieldAlert, Loader2 } from 'lucide-react';

export default function AICFOPage() {
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Welcome to the AI CFO Command Hub. I am J.A.R.V.I.S, your advanced financial assistant powered by Gemini 1.5.\n\nHow can I assist you with financial modeling, strategic planning, or market analysis today?" }
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
      setMessages(prev => [...prev, { role: 'ai', text: `System Error: ${error.message || "Unable to establish connection to Gemini protocols."}` }]);
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
            <div key={idx} className={`flex gap-4 max-w-4xl ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg ${msg.role === 'ai' ? 'bg-[#050816] text-accent border border-accent/30' : 'bg-primary/20 text-primary border border-primary/30'}`}>
                {msg.role === 'ai' ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
              </div>
              <div className={`p-5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${msg.role === 'user' ? 'bg-primary/10 border border-primary/20 text-white shadow-[0_0_15px_rgba(59,130,246,0.1)]' : 'bg-[#050816] border border-white/5 text-white/90 shadow-inner'}`}>
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
}