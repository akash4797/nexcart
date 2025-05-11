import { NextAuthProvider } from "./providers";
import "./globals.css";
import Layout from "@/components/Layout";
import { ThemeProvider } from "@/components/Theme/theme-provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <NextAuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Layout>{children}</Layout>
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
