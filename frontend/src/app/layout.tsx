import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { SiteThemeProvider } from "@/context/SiteThemeContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "CTRL/C CLUB",
  description: "Website và hệ thống quản trị dành cho câu lạc bộ CTRL/C CLUB.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={inter.variable}>
        <SiteThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </SiteThemeProvider>
      </body>
    </html>
  );
}