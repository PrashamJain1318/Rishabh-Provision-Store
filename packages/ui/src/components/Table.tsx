import React from "react";

export interface Column<T> {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
  className?: string;
}

export function Table<T extends Record<string, any>>({
  columns,
  data,
  onRowClick,
  className = "",
}: TableProps<T>) {
  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-soft-sm">
      <table className={`w-full text-left text-xs text-slate-700 dark:text-slate-300 border-collapse min-w-[600px] ${className}`}>
        <thead className="bg-slate-100/80 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200/80 dark:border-slate-800">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3.5 whitespace-nowrap">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {data.map((row, index) => (
            <tr
              key={index}
              onClick={() => onRowClick?.(row)}
              className={`transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/40 ${
                onRowClick ? "cursor-pointer" : ""
              }`}
            >
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3.5 whitespace-nowrap font-medium">
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

export default Table;
