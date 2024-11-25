import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import LayoutProvider from "@/components/providers/layout-provider";
import { LoadingScreen } from "@/components/loading-screen";
import { Suspense } from "react";
import { SessionProvider } from "next-auth/react";
import UserStoreProvider from "@/components/providers/user-store-provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Orbit – AI-Powered Task & Goal Tracker",
  description:
    "Orbit helps you stay focused, manage tasks, set goals, and boost productivity with AI-driven suggestions and Pomodoro timers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense fallback={<LoadingScreen />}>
          <SessionProvider>
            <UserStoreProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                forcedTheme="dark"
                enableSystem
                disableTransitionOnChange
              >
                <LayoutProvider>
                  <LoadingScreen />
                  {children}
                </LayoutProvider>
              </ThemeProvider>
            </UserStoreProvider>
          </SessionProvider>
        </Suspense>
      </body>
    </html>
  );
}
