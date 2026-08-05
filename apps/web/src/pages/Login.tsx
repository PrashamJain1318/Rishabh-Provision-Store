import React, { useState } from "react";
import { AuthLayout } from "../layouts/AuthLayout";
import { Input, Button } from "@rishabh-store/ui";

export const LoginPage: React.FC = () => {
  const [role, setRole] = useState<"admin" | "customer">("admin");

  return (
    <AuthLayout title="Rishabh Provision Store" subtitle="Sign in to your workspace account">
      <div className="flex bg-slate-100 dark:bg-slate-800 rounded-2xl p-1 mb-6">
        <button
          onClick={() => setRole("admin")}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
            role === "admin" ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-soft-sm" : "text-slate-500"
          }`}
        >
          Owner / Staff Login
        </button>
        <button
          onClick={() => setRole("customer")}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
            role === "customer" ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-soft-sm" : "text-slate-500"
          }`}
        >
          Customer Portal
        </button>
      </div>

      <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
        <Input label={role === "admin" ? "Email / Username" : "Mobile Number"} placeholder={role === "admin" ? "admin@rishabhstore.com" : "+91 98765 43210"} required />
        <Input label="Password / OTP" type="password" placeholder="••••••••" required />

        <div className="flex items-center justify-between text-xs text-slate-500 my-1">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="rounded-md border-slate-300" />
            <span>Remember me</span>
          </label>
          <a href="#" className="text-emerald-600 font-medium hover:underline">Forgot password?</a>
        </div>

        <a href="/dashboard" className="w-full">
          <Button variant="primary" className="w-full">
            Sign In to Workspace ➔
          </Button>
        </a>

        <p className="text-center text-xs text-slate-500 mt-4">
          Don't have an account?{" "}
          <a href="/register" className="text-emerald-600 font-semibold hover:underline">
            Register store
          </a>
        </p>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
