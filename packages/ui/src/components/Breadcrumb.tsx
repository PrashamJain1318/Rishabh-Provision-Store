import React from "react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex items-center gap-2 text-xs text-slate-500 mb-4">
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          {idx > 0 && <span>/</span>}
          {item.href ? (
            <a href={item.href} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              {item.label}
            </a>
          ) : (
            <span className="font-semibold text-slate-900 dark:text-slate-100">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
