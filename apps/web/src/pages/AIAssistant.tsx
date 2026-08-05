import React, { useState } from "react";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { Button } from "@rishabh-store/ui";
import { Bot, Send, Sparkles, TrendingUp, AlertTriangle } from "lucide-react";

interface ChatMessage {
  sender: "user" | "ai";
  text: string;
  time: string;
}

export const AIAssistantPage: React.FC = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: "ai", text: "Hello Prasham! I am your Gemini-powered AI Grocery Assistant. I can predict low stock items, suggest optimal purchase order quantities, and analyze customer Khata credit risks. How can I help you today?", time: "Just now" },
  ]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: ChatMessage = { sender: "user", text: input, time: "Just now" };
    setMessages((prev) => [...prev, userMsg]);

    setTimeout(() => {
      const aiResponse: ChatMessage = {
        sender: "ai",
        text: `Analysis complete: Based on current sales velocity for "${input}", I recommend reordering 25 units before Friday to prevent stockouts during peak weekend hours.`,
        time: "Just now",
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 800);

    setInput("");
  };

  return (
    <DashboardLayout activeNavId="ai-assistant">
      <div className="flex flex-col gap-6">
        {/* Header Title */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-section-title text-slate-900 dark:text-slate-100 font-bold flex items-center gap-3">
              <Bot className="w-8 h-8 text-emerald-500" /> Gemini AI Grocery Assistant
            </h1>
            <p className="text-sm text-slate-500">Autonomous AI stock prediction, purchase suggestions & sales analytics.</p>
          </div>
          <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold">
            Gemini Pro Active
          </span>
        </div>

        {/* 3 AI Smart Insight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-soft-sm flex items-center gap-4">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 text-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase">Demand Forecast</h4>
              <p className="text-sm font-extrabold text-slate-900 dark:text-slate-100 mt-0.5">Atta demand expected +25% this weekend</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-soft-sm flex items-center gap-4">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 text-xl flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase">Auto PO Suggestion</h4>
              <p className="text-sm font-extrabold text-slate-900 dark:text-slate-100 mt-0.5">Order 15 cases of Fortune Oil today</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-soft-sm flex items-center gap-4">
            <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 text-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase">Khata Risk Audit</h4>
              <p className="text-sm font-extrabold text-slate-900 dark:text-slate-100 mt-0.5">1 Customer due balance over 30 days</p>
            </div>
          </div>
        </div>

        {/* AI Interactive Chat Window */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-soft-sm flex flex-col h-[480px]">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <span className="font-bold text-sm text-slate-900 dark:text-slate-100">Live AI Chat Stream</span>
            <span className="text-xs text-slate-400">Response time ~ 0.4s</span>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "ai" && (
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs shrink-0">
                    AI
                  </div>
                )}
                <div
                  className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-emerald-600 text-white font-medium"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask AI about stock predictions, P&L forecasts, or purchase orders..."
              className="flex-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <Button variant="primary" size="sm" onClick={handleSend}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AIAssistantPage;
