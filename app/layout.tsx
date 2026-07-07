import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Chatbot from "./components/Chatbot";
import CustomCursor from "./components/CustomCursor";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import SideNav from "./components/SideNav";
import { ThemeProvider } from "./context/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Victoria Ssekajja — Software Developer",
  description: "Portfolio of Victoria Ssekajja, a Software Developer building web, mobile, and AI-integrated applications, based in Kampala, Uganda.",
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
          <CustomCursor />
          <Nav />
          {children}
          <SideNav />
          <Footer />
          <Chatbot />
        </ThemeProvider>
      </body>
    </html>
  );
}