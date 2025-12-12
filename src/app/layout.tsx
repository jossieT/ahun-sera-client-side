import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatAssistantWidget from "@/components/shared/ChatAssistantWidget";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "@/components/ui/sonner";


export const metadata: Metadata = {
  title: "Ethiopia Service Booking",
  description: "Book trusted professionals for home services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen">
        <Providers>
          <AuthProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                {children}
              </main>
              <ChatAssistantWidget />
              <Footer />
            </div>
            <Toaster />
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
