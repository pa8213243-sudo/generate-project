import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css"; // THIS IS THE MAGIC LINE
import { Sidebar } from "@/components/layout/Sidebar";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono", display: "swap" });

export const metadata: Metadata = { title: "Parvej OS | Finance Command Center", description: "Futuristic Finance Operating System" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${jetBrainsMono.variable} antialiased dark`}>
      <body className="bg-[#02040A] text-white flex min-h-screen overflow-x-hidden m-0 p-0">
        <Sidebar />
        <main className="flex-1 w-full lg:pl-[256px] min-h-screen bg-[#02040A]">
          {children}
        </main>
      </body>
    </html>
  );
}