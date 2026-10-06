import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { jobs } from "./cron/jobs";
import dotenv from "dotenv"
dotenv.config()

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zara-Chatbot",
  description: "AI agent development",
  icons:{
    icon:"/7.svg"
  }
};



 if (process.env.NODE_ENV !== 'development') {
  // Guard with global check to prevent duplicate cron jobs during Next.js Hot Module Reloading (HMR)
     if ((!global as any).__cronStarted) {
    (global as any).__cronStarted = true;
   
  } 
  jobs()
  
} 

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
