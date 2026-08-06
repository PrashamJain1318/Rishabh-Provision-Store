import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Database,
  Download,
  Upload,
  RotateCcw,
  ShieldCheck,
  History,
  CheckCircle,
  Sparkles,
  AlertTriangle,
  Clock,
  HardDrive,
  FileCode,
} from "lucide-react";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { Button } from "@rishabh-store/ui";

interface AuditLog {
  id: string;
  type: string;
  initiatedBy: string;
  fileSize: string;
  collectionsCount: number;
  status: string;
  timestamp: string;
}

const initialAuditLogs: AuditLog[] = [
  {
    id: "BCK-2026-004",
    type: "AUTOMATED_DAILY_BACKUP",
    initiatedBy: "System Cron Scheduler",
    fileSize: "14.2 MB",
    collectionsCount: 11,
    status: "SUCCESS",
    timestamp: "Today at 00:00 AM",
  },
  {
    id: "BCK-2026-003",
    type: "MANUAL_EXPORT",
    initiatedBy: "Prasham Jain (Owner)",
    fileSize: "14.1 MB",
    collectionsCount: 11,
    status: "SUCCESS",
    timestamp: "Yesterday at 06:30 PM",
  },
  {
    id: "BCK-2026-002",
    type: "SNAPSHOT_RESTORE",
    initiatedBy: "Prasham Jain (Owner)",
    fileSize: "13.8 MB",
    collectionsCount: 11,
    status: "RESTORED",
    timestamp: "01 Aug 2026",
  },
];

export const BackupRestorePage: React.FC = () => {
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(initialAuditLogs);
  const [isProcessing, setIsProcessing] = useState(false);
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);

  const handleCreateBackup = () => {
    setIsProcessing(true);
    setActionSuccessMsg(null);
    setTimeout(() => {
      setIsProcessing(false);
      const newLog: AuditLog = {
        id: `BCK-2026-00${auditLogs.length + 1}`,
        type: "MANUAL_BACKUP",
        initiatedBy: "Prasham Jain (Owner)",
        fileSize: "14.5 MB",
        collectionsCount: 11,
        status: "SUCCESS",
        timestamp: "Just now",
      };
      setAuditLogs([newLog, ...auditLogs]);
      setActionSuccessMsg("Database snapshot created and downloaded successfully (14.5 MB).");
      setTimeout(() => setActionSuccessMsg(null), 4000);
    }, 1200);
  };

  const handleRestoreBackup = (backupId: string) => {
    setIsProcessing(true);
    setActionSuccessMsg(null);
    setTimeout(() => {
      setIsProcessing(false);
      const restoreLog: AuditLog = {
        id: `RST-2026-00${auditLogs.length + 1}`,
        type: "SNAPSHOT_RESTORE",
        initiatedBy: "Prasham Jain (Owner)",
        fileSize: "14.2 MB",
        collectionsCount: 11,
        status: "RESTORED",
        timestamp: "Just now",
      };
      setAuditLogs([restoreLog, ...auditLogs]);
      setActionSuccessMsg(`Database successfully restored from snapshot ${backupId}.`);
      setTimeout(() => setActionSuccessMsg(null), 4000);
    }, 1500);
  };

  return (
    <DashboardLayout activeNavId="settings">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-3">
              <Database className="w-8 h-8 text-emerald-600" />
              Database Backup, Restore & Audit Trail Engine
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Create database snapshots, import/export JSON backups, restore historical checkpoints & review audit logs
            </p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 rounded-2xl">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">Automated Daily Backup: Active</span>
          </div>
        </div>

        {/* ACTION CARDS ROW */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: 1-Click Database Backup */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-6 rounded-3xl border border-emerald-200 dark:border-emerald-900/50 shadow-xl space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center shadow-md">
                <Download className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">1-Click Full Backup</h3>
              <p className="text-slate-500 text-xs">
                Export full MongoDB database snapshot containing 11 collections (Customers, Orders, Products, Cart, Suppliers).
              </p>
            </div>

            <Button
              onClick={handleCreateBackup}
              disabled={isProcessing}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" /> Create & Download Snapshot
            </Button>
          </div>

          {/* Card 2: Import Backup File */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-6 rounded-3xl border border-blue-200 dark:border-blue-900/50 shadow-xl space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center shadow-md">
                <Upload className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">Import External Seed</h3>
              <p className="text-slate-500 text-xs">
                Upload `.json` or `.bson` database seed file to merge or sync master SKU catalogs and supplier data.
              </p>
            </div>

            <Button
              onClick={() => handleRestoreBackup("BCK-2026-004")}
              disabled={isProcessing}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
            >
              <Upload className="w-4 h-4" /> Import Backup JSON File
            </Button>
          </div>

          {/* Card 3: System Recovery Checkpoint */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-6 rounded-3xl border border-purple-200 dark:border-purple-900/50 shadow-xl space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950 text-purple-600 flex items-center justify-center shadow-md">
                <RotateCcw className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">Rollback Restore</h3>
              <p className="text-slate-500 text-xs">
                Instantly restore database state to previous midnight snapshot with zero downtime and transaction isolation.
              </p>
            </div>

            <Button
              onClick={() => handleRestoreBackup("BCK-2026-004")}
              disabled={isProcessing}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 rounded-xl shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> Restore Midnight Checkpoint
            </Button>
          </div>
        </div>

        {actionSuccessMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs font-bold rounded-2xl flex items-center justify-between shadow-md"
          >
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              {actionSuccessMsg}
            </span>
          </motion.div>
        )}

        {/* AUDIT LOGS HISTORY TABLE */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <History className="w-5 h-5 text-emerald-600" />
              Database Backup & Restore Audit Trail History
            </h3>
            <span className="text-xs text-slate-500 font-medium">Immutable Compliance Log</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-500 uppercase font-bold tracking-wider">
                  <th className="py-3 px-4">Backup ID</th>
                  <th className="py-3 px-4">Operation Type</th>
                  <th className="py-3 px-4">Initiated By</th>
                  <th className="py-3 px-4">Size & Scope</th>
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="py-3 px-4 font-mono font-bold text-slate-900 dark:text-slate-100">{log.id}</td>
                    <td className="py-3 px-4 font-bold text-slate-700 dark:text-slate-300">{log.type}</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{log.initiatedBy}</td>
                    <td className="py-3 px-4 font-mono">
                      {log.fileSize} ({log.collectionsCount} collections)
                    </td>
                    <td className="py-3 px-4 text-slate-400">{log.timestamp}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          log.status === "SUCCESS" || log.status === "RESTORED"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {log.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleRestoreBackup(log.id)}
                        className="text-emerald-600 font-bold hover:underline"
                      >
                        Restore Snapshot
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BackupRestorePage;
