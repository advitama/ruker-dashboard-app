import "@/assets/styles/index.css";
import type { Metadata } from "next";
import { ThemeProvider } from "./providers/theme";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Ruker - Dashboard",
  description: "Ruker platform dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <div id="__next">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            storageKey="theme"
            disableTransitionOnChange
            enableSystem
          >
            {children}
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
