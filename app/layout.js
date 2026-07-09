import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "HealNow - Online Doctor Consultation",
  description: "Connecting with doctors anytime, anywhere.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{
      baseTheme: dark,
    }}>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {/* Header */}
            <Header />

            {/* Body */}
            <main className="min-h-screen">{children}</main>

            {/* Footer */}
            <footer className="text-center p-4 bg-muted/30 border-t border-border mt-8">
              <p className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} HealNow. All rights reserved.
              </p>
            </footer>
            <Toaster richColors position="top-right" />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
