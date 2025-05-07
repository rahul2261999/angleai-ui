import type { Metadata } from "next";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Montserrat } from "next/font/google";
import { ToastProvider } from "@/components/ui/toast";
import { AuthProvider } from "@/contexts/authContext";
export const metadata: Metadata = {
  title: "AngleAI",
  description: "We shape the reality of AI",
};

const primary = Montserrat({
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-primary",
  preload: true,
  subsets: ['latin']
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={primary.variable}>
      <body>
        <AuthProvider>
          <ToastProvider>{children}</ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
