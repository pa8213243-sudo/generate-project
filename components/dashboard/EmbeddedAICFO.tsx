"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Sparkles } from 'lucide-react';
import Link from 'next/link';

export const EmbeddedAICFO = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'ai', text: "J.A.R.V.I.S: Hi Parvej! Secure link established. I&apos;m ready to analyze financial queries." }
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
      setMessages(prev => [...prev, { role: 'ai', text: `Connection error: ${error.message}` }]);
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
          <div key={i} className={`text-[11px] font-mono leading-relaxed p-3 rounded-xl shadow-md whitespace-pre-wrap ${msg.role === 'ai' ? 'text-accent bg-[#050816] border border-accent/20 self-start mr-4' : 'text-white bg-primary/20 border border-primary/30 self-end ml-4'}`}>
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
};