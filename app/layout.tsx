import type { Metadata } from "next";
import { Spline_Sans } from "next/font/google";
import "./globals.css";

const splineSans = Spline_Sans({weight:['400','500'], subsets:['latin']}); 

export const metadata: Metadata = {
  title: "Gastos dos Senadores",
  description: "Visualizando os gastos dos senadores atraves de gráficos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${splineSans.className}antialiased bg-slate-100 min-h-screen text-slate-500`}
      >
        {children}
      </body>
    </html>
  );
}
