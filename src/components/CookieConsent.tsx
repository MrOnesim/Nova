import { useEffect, useState } from "react";
import { Cookie, X } from "lucide-react";

const STORAGE_KEY = "pretnova-cookies";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      const t = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(t);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem(STORAGE_KEY, "all");
    setVisible(false);
  };

  const refuseAll = () => {
    localStorage.setItem(STORAGE_KEY, "necessary");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] animate-fade-up p-4 sm:p-6">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.35)] backdrop-blur sm:flex-row sm:items-center sm:gap-6">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-nova-50">
          <Cookie className="h-5 w-5 text-nova-600" />
        </span>
        <div className="flex-1 text-sm text-slate-600">
          Nous utilisons des cookies pour améliorer votre expérience.{" "}
          <a href="gestion-cookies.html" className="font-semibold text-nova-700 underline underline-offset-2 hover:text-nova-900">
            En savoir plus
          </a>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-2.5">
          <button
            onClick={refuseAll}
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
          >
            Refuser tout
          </button>
          <button
            onClick={acceptAll}
            className="rounded-xl bg-nova-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-nova-600/25 transition hover:-translate-y-0.5 hover:bg-nova-700"
          >
            Accepter tout
          </button>
          <button
            onClick={() => setVisible(false)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            aria-label="Fermer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
