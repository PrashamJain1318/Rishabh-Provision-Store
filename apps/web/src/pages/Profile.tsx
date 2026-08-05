import React from "react";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { Input, Button, Avatar } from "@rishabh-store/ui";

export const ProfilePage: React.FC = () => {
  return (
    <DashboardLayout activeNavId="settings">
      <div className="flex flex-col gap-6 max-w-3xl mx-auto">
        <div className="flex items-center gap-4 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-soft-sm">
          <Avatar name="Prasham Jain" size="lg" />
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Prasham Jain</h2>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold uppercase">Store Owner & Administrator</p>
            <p className="text-xs text-slate-500 mt-1">Rishabh Provision Store • License #REG-2026-4401</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-soft-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-3">Personal Profile Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Full Name" defaultValue="Prasham Jain" />
            <Input label="Email Address" defaultValue="prasham.jain@rishabhstore.com" />
            <Input label="Phone Number" defaultValue="+91 98250 11223" />
            <Input label="RBAC Role" defaultValue="Owner (Full Access)" disabled />
          </div>
          <div className="flex justify-end pt-2">
            <Button variant="primary">Update Profile</Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
