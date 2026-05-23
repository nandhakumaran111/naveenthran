import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Sparkles, MessageSquare, CornerDownLeft, Bot, User, RotateCcw, AlertCircle } from 'lucide-react';
import { Message } from '../types';

export default function ResumeChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello! I am Naveen's virtual assistant, powered by Gemini 3.5. Recruiters and guests love to ask me things like:\n\n* ✨ What are his **AI & Machine Learning** skills?\n* 🏛️ Tell me about his **Judicial Chat Bot** project.\n* 📊 What is his B.Tech **CGPA** and educational background?\n\nHow can I help you explore Naveen's profile today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);
  
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isSending]);

  const quickPrompts = [
    { label: 'Core AI Skills', prompt: 'What are his primary AI and machine learning skills?' },
    { label: 'His Projects', prompt: 'Can you describe the projects Naveen has built?' },
    { label: 'Academic CGPA', prompt: 'Where does he study and what is his B.Tech CGPA?' },
  ];

  const handleSend = async (text: string) => {
    if (!text.trim() || isSending) return;
    
    setErrorText(null);
    const userMsg: Message = {
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsSending(true);

    try {
      const chatHistoryForBackend = [...messages, userMsg].map(m => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: chatHistoryForBackend })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Server error status: ${res.status}`);
      }

      const data = await res.json();
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.text || "I didn't receive a formal reply. Let's try again!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);

    } catch (err: any) {
      console.error(err);
      setErrorText(err.message || 'Failed to exchange message. Is the dev server or Gemini API Key configured?');
    } finally {
      setIsSending(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        role: 'assistant',
        content: "Reset complete! Ask me anything about Naveen's experience, academics, or technical projects.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setErrorText(null);
  };

  return (
    <div className="flex flex-col h-[550px] border border-white/10 bg-white/5 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden text-slate-105">
      {/* Chat header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
        <div className="flex items-center gap-2.5 bg-transparent">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 border border-white/10 text-white">
            <Sparkles className="h-5 w-5 text-blue-200 animate-pulse" />
          </div>
          <div>
            <h3 className="font-sans text-sm font-semibold text-white">Ask Naveen AI</h3>
            <p className="font-mono text-[10px] text-slate-450 flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
              gemini-3.5-flash agent active
            </p>
          </div>
        </div>
        <button
          onClick={handleReset}
          title="Reset Conversation"
          className="p-1 px-2.5 text-xs font-medium text-slate-300 hover:text-white bg-white/10 border border-white/10 rounded-lg hover:bg-white/15 cursor-pointer flex items-center gap-1 transition-all"
        >
          <RotateCcw className="h-3 w-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, index) => {
          const isAi = msg.role === 'assistant';
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={`flex items-start gap-3.5 ${isAi ? '' : 'flex-row-reverse'}`}
            >
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-xs font-semibold ${
                isAi 
                  ? 'bg-white/10 border-white/10 text-white' 
                  : 'bg-blue-600 border-blue-500 text-white'
              }`}>
                {isAi ? <Bot className="h-4 w-4 text-blue-300" /> : <User className="h-4 w-4" />}
              </div>

              <div className={`flex flex-col max-w-[78%] gap-1`}>
                <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  isAi
                    ? 'bg-white/5 border border-white/10 text-slate-200 whitespace-pre-line'
                    : 'bg-gradient-to-r from-blue-600/35 to-blue-500/10 border border-blue-550/30 text-white'
                }`}>
                  {msg.content}
                </div>
                <span className={`text-[10px] text-slate-400 font-mono px-1 ${!isAi && 'self-end'}`}>
                  {msg.timestamp}
                </span>
              </div>
            </motion.div>
          );
        })}

        {isSending && (
          <div className="flex items-start gap-3.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border bg-white/10 border-white/10 text-white">
              <Bot className="h-4 w-4 text-blue-300" />
            </div>
            <div className="rounded-2xl px-4 py-3 bg-white/5 border border-white/10 text-sm flex items-center gap-1.5 text-slate-400">
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}

        {errorText && (
          <div className="flex items-center gap-2 p-3.5 bg-red-950/40 border border-red-500/20 text-red-200 rounded-xl text-xs font-sans">
            <AlertCircle className="h-4 w-4 text-red-450 shrink-0" />
            <div className="flex-1">
              <p className="font-semibold">Chat Connection issue</p>
              <p className="text-red-300/90 leading-tight mt-0.5">{errorText}</p>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggested prompts */}
      {messages.length === 1 && (
        <div className="px-6 py-2 border-t border-white/5 bg-white/5 flex flex-wrap gap-2">
          {quickPrompts.map((p, i) => (
            <button
              key={i}
              onClick={() => handleSend(p.prompt)}
              className="text-[11px] font-medium text-blue-300 hover:text-white bg-blue-500/10 hover:bg-blue-500/25 border border-blue-400/20 rounded-full px-3 py-1 cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
            >
              {p.label} &rarr;
            </button>
          ))}
        </div>
      )}

      {/* Chat Input area */}
      <div className="p-4 border-t border-white/10 bg-white/5 col-span-12">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(inputValue);
          }}
          className="relative flex items-center"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about Naveen's skills, qualifications, or project details..."
            disabled={isSending}
            required
            className="w-full pl-4 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20 text-white placeholder:text-slate-400 transition-all disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isSending}
            className="absolute right-2 p-2 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg hover:opacity-90 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
        <div className="flex justify-between items-center mt-2 px-1">
          <span className="text-[10px] text-slate-450 font-mono">
            Powered by Google Cloud Run Container & Gemini
          </span>
          <span className="text-[10px] text-slate-450 font-mono hidden sm:inline">
            Press Enter to send <CornerDownLeft className="h-2 w-2 inline" />
          </span>
        </div>
      </div>
    </div>
  );
}
