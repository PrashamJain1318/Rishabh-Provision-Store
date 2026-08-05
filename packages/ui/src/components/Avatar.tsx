import React from "react";

export interface AvatarProps {
  src?: string;
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ src, name, size = "md", className = "" }) => {
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
  };

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return src ? (
    <img
      src={src}
      alt={name}
      className={`rounded-full object-cover border-2 border-emerald-500 shadow-soft-sm ${sizeClasses[size]} ${className}`}
    />
  ) : (
    <div
      className={`rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center border-2 border-white dark:border-slate-800 shadow-soft-sm ${sizeClasses[size]} ${className}`}
    >
      {initials}
    </div>
  );
};

export default Avatar;
