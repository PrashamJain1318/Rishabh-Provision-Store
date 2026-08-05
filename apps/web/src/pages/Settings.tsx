import React from "react";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { Input, Button } from "@rishabh-store/ui";

export const SettingsPage: React.FC = () => {
  return (
    <DashboardLayout activeNavId="settings">
      <div className="flex flex-col gap-6 max-w-4xl">
        <div>
          <h1 className="text-section-title text-slate-900 dark:text-slate-100 font-bold">System & Store Settings</h1>
          <p className="text-sm text-slate-500">Configure store branding, thermal receipt footer message, GST parameters, and API keys.</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-soft-sm flex flex-col gap-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-3">Store Details & Receipt Header</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Provision Store Name" defaultValue="Rishabh Provision Store" />
            <Input label="Contact Phone Number" defaultValue="+91 98250 11223" />
            <Input label="Store Address" defaultValue="Shop #4, Main Market, Station Road" />
            <Input label="GSTIN Registration" defaultValue="24AAAAA0000A1Z5" />
          </div>

          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-3 mt-4">Thermal Receipt Footer Message</h3>
          <Input label="Custom Receipt Footer" defaultValue="Thank you for shopping at Rishabh Provision Store! Visit Again." />

          <div className="flex justify-end mt-4">
            <Button variant="primary">Save Configuration Changes</Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
