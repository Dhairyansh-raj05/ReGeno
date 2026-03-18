import React, { useState, useRef, useEffect } from "react";
import { getConsoleAdvice } from "../services/geminiService";
import { ChatMessage } from "../types/types";
import { MessageSquare, Bot, X, Send, User } from "lucide-react";

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "model",
      text: "Hey there! I am Geno, your personal gear scout. Looking for a retro classic like the GameCube or a modern         powerhouse like the PS5?",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setIsTyping(true);

    const aiResponse = await getConsoleAdvice(userMsg);

    setIsTyping(false);
    setMessages((prev) => [...prev, { role: "model", text: aiResponse }]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {isOpen ? (
        <div className="bg-white dark:bg-slate-900 w-[350px] sm:w-[400px] h-[500px] rounded-2xl shadow-2xl flex flex-col border border-slate-200 dark:border-white/10 overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          <div className="bg-primary p-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold">Geno AI Scout</h3>
                <p className="text-[10px] opacity-80 uppercase tracking-widest font-bold">
                  Online
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-1 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div
            ref={scrollRef}
            className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50 dark:bg-background-dark/50"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex items-start gap-2 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${m.role === "user" ? "bg-primary" : "bg-slate-300 dark:bg-white/20"}`}
                >
                  {m.role === "user" ? (
                    <User className="w-3.5 h-3.5 text-white" />
                  ) : (
                    <Bot className="w-3.5 h-3.5 text-slate-700 dark:text-white" />
                  )}
                </div>
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    m.role === "user"
                      ? "bg-primary text-white rounded-tr-none"
                      : "bg-white dark:bg-white/10 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/10 rounded-tl-none shadow-sm"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-white/10 p-3 rounded-2xl rounded-tl-none border border-slate-200 dark:border-white/10">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce delay-75"></div>
                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce delay-150"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-white/10">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask Geno about consoles..."
                className="flex-1 bg-slate-100 dark:bg-white/5 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-primary text-slate-900 dark:text-white"
              />
              <button
                onClick={handleSend}
                disabled={isTyping}
                className="bg-primary text-white w-10 h-10 rounded-xl flex items-center justify-center hover:bg-primary/90 disabled:opacity-50 transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center shadow-xl neon-glow hover:scale-110 transition-transform transform active:scale-95 group"
        >
          <MessageSquare className="w-7 h-7 group-hover:rotate-12 transition-transform" />
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 border-2 border-white dark:border-background-dark rounded-full"></div>
        </button>
      )}
    </div>
  );
};

export default ChatBot;
