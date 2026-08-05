import React from "react";

export interface Column<T> {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
}

export function Table<T extends Record<string, any>>({ columns, data }: TableProps<T>) {
  return (
    <div className="w-full overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-2xl">
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold uppercase">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-sm text-slate-900 dark:text-slate-100">
          {data.map((row, idx) => (
            <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3">
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
