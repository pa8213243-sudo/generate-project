import fs from 'fs/promises';
import path from 'path';

const fileContent = `"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, Sparkles, ShieldAlert, Copy, RefreshCw, Trash2, Maximize2, Minimize2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useChatStore } from '@/store/useChatStore';

const SUGGESTED_PROMPTS = [
  "What is your CMA (US) status?",
  "Explain your ADNOC dashboard logic.",
  "How do you handle variance analysis?"
];

export const AICFOWindow = () => {
  const { 
    isOpen, setIsOpen, messages, addMessage, 
    isLoading, setIsLoading, checkLimit, incrementDailyCount, clearHistory 
  } = useChatStore();
  
  const [input, setInput] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [limitReached, setLimitReached] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setIsMounted(true); }, []);

  useEffect(() => {
    if (isOpen) {
      setLimitReached(checkLimit());
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, checkLimit, isLoading]);

  const handleSend = async (messageText: string = input) => {
    if (!messageText.trim() || isLoading || limitReached) return;
    if (checkLimit()) {
      setLimitReached(true);
      return;
    }

    setInput('');
    addMessage({ role: 'user', content: messageText.trim() });
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageText.trim() }),
      });

      const data = await response.json().catch(() => null);
      
      if (!response.ok) {
        throw new Error(data?.error || 'Server responded with an unknown error.');
      }

      if (!data || !data.reply) {
        throw new Error('Received an empty response from the AI Engine.');
      }

      addMessage({ role: 'ai', content: data.reply });
      incrementDailyCount();
    } catch (error: any) {
      addMessage({ 
        role: 'ai', 
        content: \`⚠️ **SYSTEM ALERT:** \\n\\n\${error.message || 'Connection lost.'}\`
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    const lastUserMessage = [...messages].reverse().find(m => m.role === 'user');
    if (lastUserMessage) handleSend(lastUserMessage.content);
  };

  const copyToClipboard = (text: string) => {
    if (typeof window !== "undefined") navigator.clipboard.writeText(text);
  };

  if (!isMounted) return null;

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={\`fixed bottom-6 right-6 md:left-6 md:right-auto z-50 p-4 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.3)] border transition-all \${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100 bg-[#0B1120]/80 backdrop-blur-md border-accent/50 text-accent hover:text-black hover:bg-accent'}\`}
      >
        <Sparkles className="absolute top-2 right-2 w-3 h-3 text-white animate-pulse" />
        <MessageSquare size={24} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={\`fixed z-[100] flex flex-col bg-[#050816]/95 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden transition-all duration-300 \${
              isFullscreen 
                ? 'inset-0 md:rounded-none' 
                : 'inset-0 md:inset-auto md:bottom-6 md:left-6 md:w-[420px] md:h-[600px] md:rounded-2xl'
            }\`}
          >
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#0B1120]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center border border-accent/50">
                  <Bot className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <h3 className="font-space font-bold text-sm tracking-wide text-pureWhite flex items-center gap-2">
                    AI CFO ASSISTANT <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                  </h3>
                  <p className="text-xs text-white/40 font-mono tracking-widest">GEMINI ENGINE SECURE</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={clearHistory} title="Clear Chat" className="text-white/40 hover:text-danger transition-colors p-1"><Trash2 size={16} /></button>
                <button onClick={() => setIsFullscreen(!isFullscreen)} className="hidden md:block text-white/40 hover:text-white transition-colors p-1">
                  {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                </button>
                <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white transition-colors p-1"><X size={20} /></button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
              {messages.map((msg, idx) => (
                <div key={msg.id} className={\`flex \${msg.role === 'user' ? 'justify-end' : 'justify-start'} group\`}>
                  <div className={\`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed \${msg.role === 'user' ? 'bg-accent text-black font-medium rounded-br-none shadow-[0_4px_15px_rgba(34,211,238,0.2)]' : 'bg-white/5 border border-white/10 text-white/90 rounded-bl-none'}\`}>
                    {msg.role === 'ai' && (
                      <div className="flex justify-between items-start mb-2">
                        <Bot className="w-4 h-4 text-accent opacity-50" />
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => copyToClipboard(msg.content)} className="text-white/40 hover:text-accent"><Copy size={12}/></button>
                          {idx === messages.length - 1 && <button onClick={handleRetry} className="text-white/40 hover:text-accent"><RefreshCw size={12}/></button>}
                        </div>
                      </div>
                    )}
                    
                    {/* ✅ FIX: Removed className from ReactMarkdown and wrapped it in a div */}
                    <div className="prose prose-invert prose-sm max-w-none">
                      <ReactMarkdown>
                        {msg.content}
                      </ReactMarkdown>
                    </div>

                  </div>
                </div>
              ))}
              {isLoading && (
                 <div className="flex justify-start">
                   <div className="bg-white/5 border border-white/10 rounded-2xl rounded-bl-none px-4 py-3 flex items-center gap-2">
                     <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" />
                     <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce delay-100" />
                     <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce delay-200" />
                   </div>
                 </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {messages.length < 3 && !isLoading && (
              <div className="px-4 pb-2 flex gap-2 overflow-x-auto custom-scrollbar no-scrollbar">
                {SUGGESTED_PROMPTS.map((prompt, i) => (
                  <button key={i} onClick={() => handleSend(prompt)} className="shrink-0 px-3 py-1.5 text-xs font-mono text-accent bg-accent/10 border border-accent/20 rounded-full hover:bg-accent/20 transition-colors whitespace-nowrap">
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            <div className="p-4 border-t border-white/10 bg-[#0B1120]">
              {limitReached ? (
                <div className="flex items-center justify-center gap-2 text-warning text-xs font-mono p-3 bg-warning/10 border border-warning/20 rounded-lg">
                  <ShieldAlert className="w-4 h-4" /> DAILY LIMIT REACHED (4/4)
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="relative flex items-center">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Message AI CFO..."
                    disabled={isLoading}
                    className="w-full bg-[#050816] border border-white/10 rounded-full pl-4 pr-12 py-3 text-sm text-pureWhite outline-none focus:border-accent/50 transition-colors disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="absolute right-2 p-2 bg-accent hover:bg-cyan-300 text-black rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};`;

async function fixMarkdownError() {
  const filePath = path.join(process.cwd(), 'features', 'ai-cfo', 'AICFOWindow.tsx');
  try {
    await fs.writeFile(filePath, fileContent, 'utf8');
    console.log('\x1b[32m%s\x1b[0m', '✅ SUCCESS: React-Markdown error fixed! The className has been moved to a wrapper div.');
    console.log('\x1b[36m%s\x1b[0m', '➡️ NEXT STEP: Restart your dev server (npm run dev) and try chatting again.');
  } catch (err) {
    console.error('\x1b[31m%s\x1b[0m', '❌ ERROR: Could not patch file.', err);
  }
}

fixMarkdownError();