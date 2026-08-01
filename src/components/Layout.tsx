import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import CookieConsent from "./CookieConsent";
import { LanguageProvider } from "../lib/LanguageContext";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white text-slate-800">
        <Header />
        {children}
        <Footer />
        <CookieConsent />
      </div>
    </LanguageProvider>
  );
}
