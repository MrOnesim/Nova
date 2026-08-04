import { Helmet } from "react-helmet-async";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Eyebrow } from "../components/ui";
import { steps } from "../data";
import { pt } from "../lib/content";
import { useLanguage } from "../lib/LanguageContext";

export default function HowItWorks() {
  const { lang } = useLanguage();
  return (
    <main className="bg-slate-50">
      <Helmet>
        <title>{pt(lang, "how.title")}</title>
        <meta name="description" content={pt(lang, "how.metaDesc")} />
        <meta property="og:title" content={pt(lang, "how.title")} />
        <meta property="og:description" content={pt(lang, "how.ogDesc")} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pretnova.example/comment-ca-marche" />
        <meta property="og:locale" content="fr_FR" />
      </Helmet>

      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-nova-50/95 via-white/90 to-white" />
        <div className="absolute -top-40 -right-32 -z-10 h-[520px] w-[520px] rounded-full bg-nova-300/30 blur-3xl" />
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
          <Eyebrow>{pt(lang, "how.eyebrow")}</Eyebrow>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-nova-950 sm:text-5xl">
            {pt(lang, "how.h1")}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            {pt(lang, "how.heroText")}
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="px-5 pb-24 sm:px-8">
        <div className="mx-auto w-full max-w-4xl">
          <ol className="relative space-y-8 border-l-2 border-dashed border-nova-200 pl-10 sm:pl-12">
            {steps.map((s, i) => (
              <li key={s.titleKey} className="relative">
                <span className="absolute top-6 -left-[45px] flex h-9 w-9 items-center justify-center rounded-full bg-nova-600 text-sm font-extrabold text-white ring-8 ring-slate-50 sm:-left-[49px]">
                  {i + 1}
                </span>
                <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
                  <h2 className="text-xl font-extrabold text-nova-950">{pt(lang, s.titleKey)}</h2>
                  <p className="mt-3 leading-relaxed text-slate-600">{pt(lang, s.textKey)}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-12 rounded-3xl bg-gradient-to-br from-nova-950 to-nova-800 p-8 text-white sm:p-10">
            <h2 className="text-2xl font-extrabold">{pt(lang, "how.ctaTitle")}</h2>
            <p className="mt-3 text-nova-200">
              {pt(lang, "how.ctaText")}
            </p>
            <a
              href="demande.html"
              className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-mint-500 px-7 py-4 text-base font-extrabold text-nova-950 shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:bg-mint-400"
            >
              {pt(lang, "how.ctaButton")} <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Trust signals */}
      <section className="border-t border-slate-200 bg-white px-5 py-16 sm:px-8">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="text-center text-2xl font-extrabold text-nova-950">
            {pt(lang, "how.trustTitle")}
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              ["how.trust1Title", "how.trust1Text"],
              ["how.trust2Title", "how.trust2Text"],
              ["how.trust3Title", "how.trust3Text"],
            ].map(([titleKey, textKey]) => (
              <div key={titleKey} className="rounded-2xl border border-slate-200 p-6">
                <CheckCircle2 className="h-6 w-6 text-mint-500" />
                <h3 className="mt-4 font-bold text-nova-950">{pt(lang, titleKey)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{pt(lang, textKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
