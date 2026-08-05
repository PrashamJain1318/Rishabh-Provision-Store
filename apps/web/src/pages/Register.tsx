import React from "react";
import { AuthLayout } from "../layouts/AuthLayout";
import { Input, Button } from "@rishabh-store/ui";

export const RegisterPage: React.FC = () => {
  return (
    <AuthLayout title="Register Store Account" subtitle="Create your provision store workspace">
      <form className="flex flex-col gap-3.5" onSubmit={(e) => e.preventDefault()}>
        <Input label="Store Name" placeholder="Rishabh Provision Store" required />
        <Input label="Owner Name" placeholder="Prasham Jain" required />
        <Input label="Mobile Number" placeholder="+91 98765 43210" required />
        <Input label="Email Address" type="email" placeholder="owner@rishabhstore.com" required />
        <Input label="GSTIN (Optional)" placeholder="24AAAAA0000A1Z5" />
        <Input label="Create Password" type="password" placeholder="••••••••" required />

        <a href="/dashboard" className="w-full mt-2">
          <Button variant="primary" className="w-full">
            Create Store Account ➔
          </Button>
        </a>

        <p className="text-center text-xs text-slate-500 mt-2">
          Already registered?{" "}
          <a href="/login" className="text-emerald-600 font-semibold hover:underline">
            Log in
          </a>
        </p>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
