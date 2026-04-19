import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Chatbot from "./components/Chatbot";
import { ThemeProvider } from "./context/ThemeContext";
import ThemeToggle from "./components/ThemeToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Victoria Ssekajja — Junior AI Data Scientist",
  description: "Portfolio of Victoria Ssekajja, Junior AI Technician at MCI Media Lab Kampala Uganda",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          <nav>
            <span className="logo">Victoria</span>
            <div className="nav-links">
              <a href="/">Home</a>
              <a href="/about">About</a>
              <a href="/projects">Projects</a>
              <a href="/analyser">Analyser</a>
              <a href="/contact">Contact</a>
            </div>
            <ThemeToggle />  {/* 👈 toggle button sits in the nav */}
          </nav>
          {children}
          <Chatbot />
        </ThemeProvider>
      </body>
    </html>
  );
}