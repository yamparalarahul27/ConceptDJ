import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import {
  GeistPixelGrid,
} from 'geist/font/pixel';
import "./globals.css";
import '@pqina/flip/dist/flip.min.css';
import { Agentation } from "agentation";
import LoadingScreen from "@/components/ui/LoadingScreen";
import ConceptHeader from "@/components/layout/ConceptHeader";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "CDJ",
  description: "CDJ Trade Lookup and Analytics Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`
          ${GeistSans.variable} 
          ${GeistMono.variable} 
          ${GeistPixelGrid.variable} 
          antialiased
          bg-[#0D0D21] text-white selection:bg-purple-500/30 flex flex-col min-h-screen
        `}
      >
        <ConceptHeader />
        <main className="flex-1 relative overflow-auto pt-36">
          {children}
        </main>

        <LoadingScreen />
        <Toaster
          position="top-right"
          theme="dark"
          closeButton
          expand={false}
          offset={24}
          toastOptions={{
            style: {
              background: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '0px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
              color: 'white',
              fontFamily: 'var(--font-geist-mono)',
              fontSize: '14px',
              padding: '16px 20px',
            },
          }}
        />
        {process.env.NODE_ENV === "development" && <Agentation />}
      </body>
    </html>
  );
}
