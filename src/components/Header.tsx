import { useEffect, useState } from "react";
import { Menu, Phone, Sparkles, X } from "lucide-react";
import { langNames, t, type Lang } from "../lib/locale";
import { useLanguage } from "../lib/LanguageContext";

const linkHrefs = [
  "index.html#simulateur",
  "index.html#ventajas",
  "comment-ca-marche.html",
  "avis.html",
  "faq.html",
];

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="index.html" className="flex items-center gap-2.5">
      <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-nova-500 to-nova-700 shadow-lg shadow-nova-600/30">
        <Sparkles className="h-5 w-5 text-white" strokeWidth={2.4} />
      </span>
      <span className={`text-lg font-extrabold tracking-tight ${light ? "text-white" : "text-nova-950"}`}>
        Prêt<span className="text-mint-500">Nova</span>
      </span>
    </a>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { lang, setLang } = useLanguage();

  const navLabels = [
    t(lang, "navSimulator"),
    t(lang, "navAdvantages"),
    t(lang, "navHowItWorks"),
    t(lang, "navReviews"),
    t(lang, "navFaq"),
  ];
  const links = linkHrefs.map((href, i) => ({ href, label: navLabels[i] }));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-slate-200/80 bg-white/90 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-18 w-full max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-lg px-3.5 py-2 text-sm font-semibold text-slate-600 transition hover:bg-nova-50 hover:text-nova-700"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value as Lang)}
            aria-label="Langue / Language"
            className="rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-sm font-semibold text-slate-700 transition hover:border-nova-300 focus:outline-none focus:ring-2 focus:ring-nova-500/40"
          >
            {(Object.keys(langNames) as Lang[]).map((l) => (
              <option key={l} value={l}>
                {langNames[l]}
              </option>
            ))}
          </select>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href="tel:+33756916774"
              className="flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-nova-700"
            >
              <Phone className="h-4 w-4" /> 07 56 91 67 74
            </a>
            <a
              href="demande.html"
              className="rounded-xl bg-nova-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-nova-600/25 transition hover:-translate-y-0.5 hover:bg-nova-700"
            >
              {t(lang, "navApply")}
            </a>
          </div>

          <button
            className="rounded-lg border border-slate-200 bg-white p-2 text-slate-700 lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white px-5 pb-6 shadow-xl lg:hidden">
          <nav className="flex flex-col py-2">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-nova-50"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <a
            href="demande.html"
            onClick={() => setOpen(false)}
            className="flex w-full items-center justify-center rounded-xl bg-nova-600 px-5 py-3 text-sm font-bold text-white"
          >
            {t(lang, "navApply")}
          </a>
        </div>
      )}
    </header>
  );
}
