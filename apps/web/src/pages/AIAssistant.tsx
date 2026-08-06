import React, { useState } from "react";
import {
  Bot,
  Send,
  Sparkles,
  AlertTriangle,
  HelpCircle,
  Package,
  ShoppingBag,
  Percent,
  Calendar,
  Zap,
  Loader2,
} from "lucide-react";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { Button } from "@rishabh-store/ui";
import api from "../lib/api";

interface ChatMessage {
  sender: "user" | "ai";
  text: string;
  time: string;
  model?: string;
}

const PRESET_PROMPTS = [
  { icon: HelpCircle, text: "Why were sales lower this week?" },
  { icon: Package, text: "Which products should I reorder?" },
  { icon: AlertTriangle, text: "Show low-stock items." },
  { icon: ShoppingBag, text: "Summarize today's business." },
  { icon: Percent, text: "Which categories generate the most profit?" },
  { icon: Calendar, text: "Suggest products for Diwali promotions." },
];

export const AIAssistantPage: React.FC = () => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: "ai",
      text: "👋 Welcome to your Google Gemini-powered AI Business Assistant! Connected to live store catalog & inventory velocity engine.",
      time: "Just now",
      model: "gemini-2.5-flash",
    },
  ]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isLoading) return;

    const userMsg: ChatMessage = { sender: "user", text: query, time: new Date().toLocaleTimeString() };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsLoading(true);

    try {
      const res = await api.post("/ai/query", { prompt: query });
      const aiData = res.data?.data;
      const aiResponseText = aiData?.response || "No response received from Gemini AI.";

      const aiResponse: ChatMessage = {
        sender: "ai",
        text: aiResponseText,
        time: new Date().toLocaleTimeString(),
        model: aiData?.model || "gemini-2.5-flash",
      };

      setMessages((prev) => [...prev, aiResponse]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        sender: "ai",
        text: `⚠️ Error: ${err.message || "Failed to reach Gemini AI backend service."}`,
        time: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout activeNavId="ai-assistant">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-3">
              <Bot className="w-8 h-8 text-emerald-600 animate-pulse" />
              Google Gemini AI Business Assistant & Decision Engine
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Ask AI about turnover trends, reorder recommendations, low-stock alerts, and promotional strategies
            </p>
          </div>
          <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold">
            Gemini 2.5 Flash Active
          </span>
        </div>

        {/* PRESET QUICK PROMPT CHIPS */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            Instant AI Prompts (Click to Ask)
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {PRESET_PROMPTS.map((prompt, idx) => {
              const Icon = prompt.icon;
              return (
                <button
                  key={idx}
                  disabled={isLoading}
                  onClick={() => handleSend(prompt.text)}
                  className="p-3 bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-slate-200 dark:border-slate-700 hover:border-emerald-300 rounded-xl text-left text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2.5 transition-all group disabled:opacity-50"
                >
                  <Icon className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 shrink-0" />
                  <span className="truncate">{prompt.text}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* AI INTERACTIVE CHAT WINDOW */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl flex flex-col h-[480px] overflow-hidden">
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/30">
            <span className="font-bold text-xs text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              Gemini AI Conversation Log
            </span>
            <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-200">
              {isLoading ? "Querying Gemini API..." : "Live Connection Ready"}
            </span>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "ai" && (
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-black flex items-center justify-center text-xs shrink-0 shadow-md">
                    AI
                  </div>
                )}
                <div
                  className={`max-w-xl p-4 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-emerald-600 text-white font-medium shadow-md"
                      : "bg-slate-100 dark:bg-slate-800/90 text-slate-900 dark:text-slate-100 border border-slate-200/80 dark:border-slate-700 whitespace-pre-line"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 justify-start items-center text-xs font-mono text-slate-400">
                <div className="w-8 h-8 rounded-full bg-emerald-600/20 text-emerald-500 flex items-center justify-center text-xs">
                  <Loader2 className="w-4 h-4 animate-spin" />
                </div>
                <span>Gemini 2.5 Flash is thinking...</span>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex gap-2 bg-slate-50/50 dark:bg-slate-800/30">
            <input
              type="text"
              value={input}
              disabled={isLoading}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask AI anything about sales, inventory velocity, or customer trends..."
              className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/30 disabled:opacity-50"
            />
            <Button
              disabled={isLoading}
              onClick={() => handleSend()}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 rounded-xl shadow-lg shadow-emerald-500/20 disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AIAssistantPage;
