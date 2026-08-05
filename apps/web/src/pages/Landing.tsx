import React from "react";
import { StoreLayout } from "../layouts/StoreLayout";
import { Button } from "@rishabh-store/ui";

export const LandingPage: React.FC = () => {
  return (
    <StoreLayout>
      {/* Hero Banner with Selective Glassmorphism */}
      <section className="glass-panel rounded-3xl p-8 sm:p-12 text-center my-6 relative overflow-hidden shadow-soft-lg">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-4">
          <span className="px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider">
            Enterprise Retail Management System
          </span>
          <h1 className="text-display-hero text-slate-900 dark:text-slate-100 font-extrabold tracking-tight">
            Rishabh Provision Store
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 font-medium italic">
            Smart Grocery. Smarter Business.
          </p>
          <p className="text-base text-slate-500 dark:text-slate-400 max-w-xl">
            Ultra-fast POS billing, real-time inventory tracking, digital Khata credit ledger, and AI-powered sales insights in one unified platform.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
            <a href="/pos">
              <Button size="lg" variant="primary">Launch Express POS</Button>
            </a>
            <a href="/dashboard">
              <Button size="lg" variant="secondary">Owner Dashboard</Button>
            </a>
          </div>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-soft-sm hover:shadow-soft-md transition-all">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 text-2xl flex items-center justify-center mb-4">⚡</div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Express POS Billing</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Keyboard-first cashier terminal with USB/Bluetooth barcode scanner integration & 2"/3" thermal receipt printing.</p>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-soft-sm hover:shadow-soft-md transition-all">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 text-2xl flex items-center justify-center mb-4">🏬</div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Stock & Expiry Control</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Real-time stock tracking, batch numbers, automated low-stock alerts, and 30-day perishable expiry date tags.</p>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-soft-sm hover:shadow-soft-md transition-all">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-2xl flex items-center justify-center mb-4">📒</div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Digital Khata Ledger</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Track customer Udhar balances, set credit limits, view transaction ledgers, and trigger automated WhatsApp payment reminders.</p>
        </div>
      </section>
    </StoreLayout>
  );
};

export default LandingPage;
