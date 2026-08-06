import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Send,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  HelpCircle,
  Package,
  ShoppingBag,
  Percent,
  Calendar,
  Zap,
} from "lucide-react";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { Button } from "@rishabh-store/ui";

interface ChatMessage {
  sender: "user" | "ai";
  text: string;
  time: string;
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
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: "ai",
      text: "👋 Welcome to your Gemini-powered AI Business Assistant! I analyze live store transactions, inventory velocity, customer buying behavior, and financial margins. Click any prompt below or type your question.",
      time: "Just now",
    },
  ]);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = { sender: "user", text: query, time: "Just now" };
    setMessages((prev) => [...prev, userMsg]);

    setTimeout(() => {
      let aiResponseText = "";
      const q = query.toLowerCase();

      if (q.includes("sales lower")) {
        aiResponseText =
          "📊 **Sales Velocity Analysis**: Weekly sales dropped 4.2% primarily due to a 2-day stockout of *Aashirvaad Atta 5kg* (which accounts for ~12% of total turnover) and a temporary decrease in Tuesday footfall. Recommendation: Reorder Atta stock 3 days earlier before weekend peak demand.";
      } else if (q.includes("reorder")) {
        aiResponseText =
          "📦 **Reorder Recommendations (Powered by Velocity Model)**:\n1. **Aashirvaad Atta 5kg**: Stock = 12 (Min = 25). Reorder +150 Units from ITC Ltd.\n2. **Fortune Mustard Oil 1L**: Stock = 18 (Min = 30). Reorder +100 Units from Adani Wilmar.\n3. **Amul Butter 500g**: Stock = 8 (Min = 20). Reorder +80 Units from Amul Dairy.";
      } else if (q.includes("low-stock")) {
        aiResponseText =
          "⚠️ **Low Stock Alert Audit**:\n- 4 SKUs are below critical threshold (Atta 5kg, Fortune Oil 1L, Amul Butter 500g, Tata Salt 1kg).\n- 1 SKU is completely OUT OF STOCK (Organic Quinoa 500g). Reorder PO auto-drafted.";
      } else if (q.includes("summarize today")) {
        aiResponseText =
          "✨ **Today's Executive Summary**:\n- **Gross Revenue**: ₹18,450 (+14.2% vs yesterday)\n- **Orders Fulfilled**: 142 Orders (110 Storefront + 32 POS Counter)\n- **Net Profit**: ₹3,520 (19.1% Margin)\n- **Top Payment Mode**: UPI QR Code (52% share)";
      } else if (q.includes("profit")) {
        aiResponseText =
          "💰 **Highest Profit Margin Categories**:\n1. **Masala & Spices**: 34.2% Gross Margin (Top earner: Catch Turmeric 500g)\n2. **Dairy & Chilled**: 28.5% Gross Margin (Top earner: Amul Cheese)\n3. **Atta & Flours**: 24.1% Gross Margin (Highest volume driver)";
      } else if (q.includes("diwali")) {
        aiResponseText =
          "🎆 **Diwali Festival Promotion Plan**:\n1. **Dry Fruits & Sweets**: Stock up on Kaju, Badam & Ferrero Rocher gift packs (demand surges 4.5x).\n2. **Pooja Needs**: Bundle Ghee, Diya, Oil, and Incense sticks at ₹299 (Save 15%).\n3. **Promo Code**: Launch code **DIWALI20** (20% OFF on orders > ₹999).";
      } else {
        aiResponseText = `🤖 **Gemini AI Insights**: Analyzing live store database for "${query}". Re-evaluating sales turnover, product margins, and stock velocity. All systems operating at optimal performance.`;
      }

      const aiResponse: ChatMessage = { sender: "ai", text: aiResponseText, time: "Just now" };
      setMessages((prev) => [...prev, aiResponse]);
    }, 600);

    if (!textToSend) setInput("");
  };

  return (
    <DashboardLayout activeNavId="ai-assistant">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-3">
              <Bot className="w-8 h-8 text-emerald-600 animate-pulse" />
              Gemini AI Business Assistant & Decision Engine
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Ask AI about turnover trends, reorder recommendations, low-stock alerts, and promotional strategies
            </p>
          </div>
          <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold">
            Gemini 1.5 Pro Active
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
                  onClick={() => handleSend(prompt.text)}
                  className="p-3 bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-slate-200 dark:border-slate-700 hover:border-emerald-300 rounded-xl text-left text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2.5 transition-all group"
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
              Response Time ~0.3s
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
          </div>

          <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex gap-2 bg-slate-50/50 dark:bg-slate-800/30">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask AI anything about sales, inventory velocity, or customer trends..."
              className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            />
            <Button
              onClick={() => handleSend()}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 rounded-xl shadow-lg shadow-emerald-500/20"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AIAssistantPage;
