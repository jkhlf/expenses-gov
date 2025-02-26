import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export function Button({
  className,
  variant = "default",
  size = "md",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 disabled:opacity-50 disabled:pointer-events-none",
        {
          "bg-violet-600 text-white hover:bg-violet-700": variant === "default",
          "bg-transparent border border-gray-300 hover:bg-gray-100": variant === "outline",
          "bg-transparent hover:bg-gray-100": variant === "ghost",
          "bg-transparent text-violet-600 hover:underline p-0 h-auto": variant === "link",
          "text-xs px-2.5 py-1.5": size === "sm",
          "text-sm px-4 py-2": size === "md",
          "text-base px-6 py-3": size === "lg",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
