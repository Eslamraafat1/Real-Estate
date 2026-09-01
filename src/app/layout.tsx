import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { LanguageProvider } from "@/context/LanguageContext";

import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import BackToTop from "@/components/BackToTop/BackToTop";

export const metadata: Metadata = {
  title: "Aqarat | Premium Real Estate in Egypt",
  description: "Discover the finest properties in Egypt. Luxury villas, modern apartments, and penthouses. Over 15 years of real estate expertise with a professional team ensuring the best experience.",
  keywords: "real estate, apartments, villas, penthouse, egypt property, real estate investment",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" dir="ltr" data-theme="dark" suppressHydrationWarning>
      <body>
        <LanguageProvider>
          <LoadingScreen />
          <Navbar />
          <main style={{ paddingTop: 'var(--navbar-height)' }}>
            {children}
          </main>
          <Footer />
          <BackToTop />
        </LanguageProvider>
      </body>
    </html>
  );
}
