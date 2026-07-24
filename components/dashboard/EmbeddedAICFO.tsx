"use client";
import React, { useState } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
}

export function EmbeddedAICFO() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: "Global Financial Intelligence initialized. Ask me anything in any language — I will analyze and respond with clean, bulleted insights.",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userText = input;
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: userText,
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await res.json();

      if (res.ok && data.reply) {
        setMessages((prev) => [
          ...prev,
          { id: Date.now().toString(), sender: 'ai', text: data.reply },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            sender: 'ai',
            text: `API Error: ${data.error || "Failed to reach Gemini engine. Check GEMINI_API_KEY in Netlify settings."}`,
          },
        ]);
      }
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: 'ai',
          text: `Network Error: ${err.message || "Failed to connect to backend server."}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl bg-[#0B1120] border border-white/10 p-5 flex flex-col justify-between shadow-xl h-full min-h-[300px]">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-space font-bold text-white tracking-widest uppercase">AI CFO ASSISTANT</h3>
            <p className="text-[9px] text-white/40">Secure Gemini Server Engine</p>
          </div>
        </div>
        <span className="flex items-center gap-1 text-[9px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
          <Sparkles className="w-2.5 h-2.5 animate-pulse" /> Live
        </span>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto my-3 space-y-3 pr-1 text-xs custom-scrollbar max-h-[220px]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'ai' && (
              <div className="w-6 h-6 rounded-md bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300 shrink-0 mt-0.5">
                <Bot className="w-3.5 h-3.5" />
              </div>
            )}
            <div
              className={`p-3 rounded-xl max-w-[85%] leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white font-medium rounded-br-none'
                  : 'bg-white/5 border border-white/10 text-cyan-100/90 rounded-bl-none font-mono text-[11px]'
              }`}
            >
              {msg.text.split('\n').map((line, i) => (
                <p key={i} className={line.startsWith('-') || line.startsWith('•') || line.match(/^\d\./) ? 'ml-2 my-0.5' : 'mb-1'}>
                  {line}
                </p>
              ))}
            </div>
            {msg.sender === 'user' && (
              <div className="w-6 h-6 rounded-md bg-blue-600/30 border border-blue-400/30 flex items-center justify-center text-white shrink-0 mt-0.5">
                <User className="w-3.5 h-3.5" />
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="text-[10px] font-mono text-cyan-400/70 animate-pulse flex items-center gap-2">
            <Bot className="w-3 h-3 text-cyan-400" /> Processing query via Gemini API...
          </div>
        )}
      </div>

      {/* Input Field */}
      <div className="flex items-center gap-2 pt-2 border-t border-white/10">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask AI CFO in ANY language..."
          className="flex-1 bg-[#050816] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-cyan-400/50 transition-colors font-mono"
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="p-2 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-black rounded-xl transition-all shadow-[0_0_12px_rgba(34,211,238,0.3)] active:scale-95"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}