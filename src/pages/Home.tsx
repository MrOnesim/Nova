import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Clock3,
  Headphones,
  Landmark,
  LockKeyhole,
  Quote,
  ShieldCheck,
  Star,
  UserCheck,
  Zap,
} from "lucide-react";
import Simulator, { type SimulationResult } from "../components/Simulator";
import { Counter, Eyebrow, Section } from "../components/ui";
import { faqs, features, photos, projects, stats, steps, testimonials } from "../data";
import { pt } from "../lib/content";
import { useLanguage } from "../lib/LanguageContext";

const icons: Record<string, typeof Zap> = {
  Zap,
  ShieldCheck,
  Landmark,
  LockKeyhole,
  UserCheck,
  Headphones,
};

export default function Home() {
  const { lang } = useLanguage();
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const goApply = (r?: SimulationResult) => {
    if (r) {
      sessionStorage.setItem("pretnova-prefill", JSON.stringify(r));
    }
    window.location.href = "demande.html";
  };

  return (
    <main>
      <Helmet>
        <title>{pt(lang, "home.title")}</title>
        <meta name="description" content={pt(lang, "home.metaDesc")} />
        <meta property="og:title" content={pt(lang, "home.title")} />
        <meta property="og:description" content={pt(lang, "home.ogDesc")} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pretnova.example" />
        <meta property="og:locale" content="fr_FR" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FinancialService",
          name: "Prêt Nova",
          description: "Simulateur et intermédiation en crédit à la consommation.",
          url: "https://pretnova.example",
          areaServed: "EU",
          feesAndCommissionsSpecification: "https://pretnova.example/information-precontractuelle",
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+33-1-80-00-00-00",
            contactType: "customer service",
            availableLanguage: ["French"],
          },
          offers: {
            "@type": "LoanOrCredit",
            amount: { "@type": "MonetaryAmount", minValue: 1000, maxValue: 75000, currency: "EUR" },
            loanTerm: { "@type": "Duration", minValue: "P18M", maxValue: "P84M" },
            interestRate: { "@type": "QuantitativeValue", minValue: 7.9, maxValue: 14.5, unitText: "PERCENT" },
          },
        })}</script>
      </Helmet>

      {/* HERO */}
      <section id="inicio" className="relative overflow-hidden pt-30 pb-16 lg:pt-36">
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-b from-nova-50/95 via-white/90 to-white"
          style={{ backgroundImage: `url(${photos.heroBg})`, backgroundSize: "cover", backgroundPosition: "center", backgroundBlendMode: "overlay" }}
        />
        <div className="absolute -top-40 -right-32 -z-10 h-[520px] w-[520px] rounded-full bg-nova-300/30 blur-3xl" />
        <div className="absolute top-52 -left-40 -z-10 h-[420px] w-[420px] rounded-full bg-mint-400/20 blur-3xl" />
        <img src={photos.moneyHand} alt="" aria-hidden className="pointer-events-none absolute right-8 bottom-8 -z-10 h-28 w-auto select-none opacity-10 lg:right-16" />

        <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Eyebrow>
              <span className="h-1.5 w-1.5 rounded-full bg-mint-500" /> {pt(lang, "home.eyebrow")}
            </Eyebrow>
            <h1 className="mt-6 text-4xl leading-[1.05] font-extrabold tracking-tight text-nova-950 sm:text-5xl lg:text-6xl">
              {pt(lang, "home.h1a")}{" "}
              <span className="bg-gradient-to-r from-nova-600 to-mint-500 bg-clip-text text-transparent">
                {pt(lang, "home.h1b")}
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
              {pt(lang, "home.heroText")}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#simulateur"
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-nova-600 px-7 py-4 text-base font-bold text-white shadow-xl shadow-nova-600/30 transition hover:-translate-y-0.5 hover:bg-nova-700"
              >
                {pt(lang, "home.ctaSim")}
                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </a>
              <button
                onClick={() => goApply()}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-nova-100 bg-white px-7 py-4 text-base font-bold text-nova-800 transition hover:border-nova-300 hover:bg-nova-50"
              >
                {pt(lang, "home.ctaApply")}
              </button>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3">
              {[
                [ShieldCheck, pt(lang, "home.badge1")],
                [Landmark, pt(lang, "home.badge2")],
                [Clock3, pt(lang, "home.badge3")],
              ].map(([Icon, label]) => {
                const I = Icon as typeof Clock3;
                return (
                  <span
                    key={label as string}
                    className="flex items-center gap-2 text-sm font-semibold text-slate-700"
                  >
                    <I className="h-4.5 w-4.5 text-mint-500" />
                    {label as string}
                  </span>
                );
              })}
            </div>

            <div className="mt-9 flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white/70 p-4 backdrop-blur">
              <div className="flex -space-x-3">
                {testimonials.map((t) => (
                  <span
                    key={t.name}
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-white text-[11px] font-bold text-white ${t.color}`}
                  >
                    {t.initials}
                  </span>
                ))}
                <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-nova-600 text-[11px] font-bold text-white">
                  +42k
                </span>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="ml-1 text-sm font-bold text-nova-950">4,8/5</span>
                </div>
                <p className="text-xs text-slate-500">{pt(lang, "home.socialProof")}</p>
              </div>
            </div>
          </div>

          {/* Hero image collage */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src={photos.heroWoman}
                  alt={pt(lang, "home.altHeroWoman")}
                  className="h-64 w-full rounded-3xl object-cover shadow-xl shadow-nova-900/10"
                />
                <img
                  src={photos.kitchen}
                  alt={pt(lang, "home.altKitchen")}
                  loading="lazy"
                  className="h-40 w-full rounded-3xl object-cover shadow-xl shadow-nova-900/10"
                />
              </div>
              <div className="space-y-4 pt-10">
                <img
                  src={photos.cafeOwner}
                  alt={pt(lang, "home.altCafeOwner")}
                  loading="lazy"
                  className="h-40 w-full rounded-3xl object-cover shadow-xl shadow-nova-900/10"
                />
                <img
                  src={photos.familyHome}
                  alt={pt(lang, "home.altFamilyHome")}
                  loading="lazy"
                  className="h-64 w-full rounded-3xl object-cover shadow-xl shadow-nova-900/10"
                />
              </div>
            </div>

            <div className="animate-floaty absolute -bottom-6 -left-4 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-2xl backdrop-blur">
              <p className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">{pt(lang, "home.floatLabel")}</p>
              <p className="text-2xl font-extrabold text-nova-800">30 min</p>
              <p className="text-xs text-mint-600">● {pt(lang, "home.floatNote")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* SIMULATOR */}
      <section className="px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-8 max-w-2xl">
            <Eyebrow>{pt(lang, "home.simEyebrow")}</Eyebrow>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-nova-950 sm:text-4xl">
              {pt(lang, "home.simTitle")}
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              {pt(lang, "home.simText")}
            </p>
          </div>
          <Simulator onApply={(r) => goApply(r)} />
        </div>
      </section>

      {/* PROJECTS GALLERY */}
      <Section className="bg-white">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <Eyebrow>{pt(lang, "home.projEyebrow")}</Eyebrow>
            <h2 className="reveal mt-5 text-3xl font-extrabold tracking-tight text-nova-950 sm:text-4xl">
              {pt(lang, "home.projTitle")}
            </h2>
          </div>
          <a href="#simulateur" className="reveal font-bold text-nova-700 hover:text-nova-900">
            {pt(lang, "home.projCta")} →
          </a>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((p, i) => (
            <article
              key={p.titleKey}
              className="reveal group relative overflow-hidden rounded-3xl"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <img
                src={p.photo}
                alt={pt(lang, p.titleKey)}
                loading="lazy"
                className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-nova-950/85 via-nova-950/25 to-transparent" />
              <div className="absolute right-5 bottom-5 left-5 text-white">
                <p className="text-lg font-extrabold">{pt(lang, p.titleKey)}</p>
                <p className="text-sm text-nova-100">{pt(lang, p.amountKey)}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* FEATURES */}
      <Section id="ventajas" className="bg-slate-50">
        <div className="max-w-2xl">
          <Eyebrow>{pt(lang, "home.featEyebrow")}</Eyebrow>
          <h2 className="reveal mt-5 text-3xl font-extrabold tracking-tight text-nova-950 sm:text-4xl">
            {pt(lang, "home.featTitle")}
          </h2>
          <p className="reveal mt-4 text-lg text-slate-600">
            {pt(lang, "home.featText")}
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => {
            const Icon = icons[f.icon];
            return (
              <article
                key={f.titleKey}
                className="reveal group rounded-3xl border border-slate-200/80 bg-white p-7 transition hover:-translate-y-1 hover:border-nova-200 hover:shadow-[0_28px_60px_-32px_rgba(14,42,114,0.4)]"
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <span className="inline-flex h-13 w-13 items-center justify-center rounded-2xl bg-nova-50 p-3.5 text-nova-600 transition group-hover:bg-nova-600 group-hover:text-white">
                  <Icon className="h-6 w-6" strokeWidth={2.2} />
                </span>
                <h3 className="mt-5 text-lg font-bold text-nova-950">{pt(lang, f.titleKey)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{pt(lang, f.textKey)}</p>
              </article>
            );
          })}
        </div>
      </Section>

      {/* STATS */}
      <Section className="bg-nova-950 text-white">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.labelKey} className="reveal text-center">
              <p className="text-4xl font-extrabold tracking-tight text-mint-400 lg:text-5xl">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-3 text-sm font-medium text-nova-200">{pt(lang, s.labelKey)}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* HOW IT WORKS — preview */}
      <Section id="como-funciona" className="bg-white">
        <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <Eyebrow>{pt(lang, "home.howEyebrow")}</Eyebrow>
            <h2 className="reveal mt-5 text-3xl font-extrabold tracking-tight text-nova-950 sm:text-4xl">
              {pt(lang, "home.howTitle")}
            </h2>
            <p className="reveal mt-4 text-lg text-slate-600">
              {pt(lang, "home.howText")}
            </p>
            <img
              src={photos.advisor}
              alt={pt(lang, "home.altAdvisor")}
              loading="lazy"
              className="reveal mt-8 h-60 w-full rounded-3xl object-cover"
            />
            <a
              href="comment-ca-marche.html"
              className="reveal mt-7 inline-flex items-center gap-2 rounded-2xl bg-nova-600 px-6 py-3.5 font-bold text-white shadow-lg shadow-nova-600/25 transition hover:-translate-y-0.5 hover:bg-nova-700"
            >
              {pt(lang, "home.howCta")} <ArrowRight className="h-5 w-5" />
            </a>
          </div>

          <div className="space-y-6">
            {steps.slice(0, 2).map((s, i) => (
              <div key={s.titleKey} className="reveal rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm" style={{ animationDelay: `${i * 90}ms` }}>
                <h3 className="text-lg font-bold text-nova-950">
                  <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-nova-600 text-xs font-extrabold text-white">{i + 1}</span>
                  {pt(lang, s.titleKey)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{pt(lang, s.textKey)}</p>
              </div>
            ))}
            <a
              href="comment-ca-marche.html"
              className="reveal mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-nova-700 hover:text-nova-900"
            >
              {pt(lang, "home.howMore")} →
            </a>
          </div>
        </div>
      </Section>

      {/* TRANSPARENCY + IMAGE */}
      <Section className="bg-slate-50">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="reveal grid grid-cols-3 gap-4">
            <img
              src={photos.signing}
              alt={pt(lang, "home.altSigning")}
              loading="lazy"
              className="col-span-3 h-56 w-full rounded-3xl object-cover"
            />
            <img
              src={photos.desk}
              alt={pt(lang, "home.altDesk")}
              loading="lazy"
              className="h-44 w-full rounded-3xl object-cover"
            />
            <img
              src={photos.euroCoins}
              alt={pt(lang, "home.altEuroCoins")}
              loading="lazy"
              className="h-44 w-full rounded-3xl object-cover"
            />
            <img
              src={photos.manPhone}
              alt={pt(lang, "home.altManPhone")}
              loading="lazy"
              className="h-44 w-full rounded-3xl object-cover"
            />
          </div>
          <div className="reveal">
            <Eyebrow>{pt(lang, "home.transpEyebrow")}</Eyebrow>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-nova-950 sm:text-4xl">
              {pt(lang, "home.transpTitle")}
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              {pt(lang, "home.transpText")}
            </p>
            <ul className="mt-7 space-y-3.5">
              {[
                "home.transpPoint1",
                "home.transpPoint2",
                "home.transpPoint3",
                "home.transpPoint4",
              ].map((k) => (
                <li key={k} className="flex items-start gap-3 text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-mint-500" />
                  <span className="font-medium">{pt(lang, k)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* TESTIMONIALS — preview */}
      <Section id="opiniones" className="bg-white">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>{pt(lang, "home.revEyebrow")}</Eyebrow>
          <h2 className="reveal mt-5 text-3xl font-extrabold tracking-tight text-nova-950 sm:text-4xl">
            {pt(lang, "home.revTitle")}
          </h2>
          <p className="reveal mt-4 text-slate-600">
            {pt(lang, "home.revText")} <strong className="text-nova-950">4,8/5</strong> {pt(lang, "home.revText2")}
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.slice(0, 2).map((t, i) => (
            <figure
              key={t.name}
              className="reveal flex h-full flex-col rounded-3xl border border-slate-200/80 bg-white p-7 shadow-sm"
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <Quote className="h-8 w-8 text-nova-200" />
              <blockquote className="mt-4 flex-1 leading-relaxed text-slate-700">« {pt(lang, t.quoteKey)} »</blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
                <span className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold text-white ${t.color}`}>{t.initials}</span>
                <span>
                  <span className="block font-bold text-nova-950">{t.name}</span>
                  <span className="block text-xs text-slate-500">{pt(lang, t.cityKey)}</span>
                </span>
                <BadgeCheck className="ml-auto h-5 w-5 text-mint-500" />
              </figcaption>
            </figure>
          ))}
          <a
            href="avis.html"
            className="reveal flex h-full min-h-[260px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-white/60 p-7 text-center transition hover:border-nova-300 hover:bg-white"
            style={{ animationDelay: `${1 * 90}ms` }}
          >
            <span className="text-4xl font-extrabold text-nova-600">4,8/5</span>
            <p className="mt-2 text-sm text-slate-600">{pt(lang, "home.revMore")} →</p>
          </a>
        </div>
      </Section>

      {/* FAQ — preview */}
      <Section id="faq" className="bg-slate-50">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow>{pt(lang, "home.faqEyebrow")}</Eyebrow>
            <h2 className="reveal mt-5 text-3xl font-extrabold tracking-tight text-nova-950 sm:text-4xl">
              {pt(lang, "home.faqTitle")}
            </h2>
            <p className="reveal mt-4 text-slate-600">
              {pt(lang, "home.faqText")}{" "}
              <a href="faq.html" className="font-semibold text-nova-700 underline underline-offset-2 hover:text-nova-900">
                {pt(lang, "home.faqLink")}
              </a>
            </p>
            <a
              href="faq.html"
              className="reveal mt-6 inline-flex items-center gap-2 rounded-2xl bg-nova-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-nova-600/25 transition hover:-translate-y-0.5 hover:bg-nova-700"
            >
              {pt(lang, "home.faqCta")} <ArrowRight className="h-4 w-4" />
            </a>
            <img
              src={photos.entrepreneur}
              alt={pt(lang, "home.altEntrepreneur")}
              loading="lazy"
              className="reveal mt-8 hidden h-64 w-full rounded-3xl object-cover lg:block"
            />
          </div>

          <div className="space-y-3">
            {faqs.slice(0, 3).map((f) => (
              <div
                key={f.qKey}
                className="reveal rounded-2xl border border-slate-200 bg-white/80 px-6 py-5"
              >
                <p className="font-bold text-nova-950">{pt(lang, f.qKey)}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{pt(lang, f.aKey)}</p>
              </div>
            ))}
            <a
              href="faq.html"
              className="reveal mt-2 inline-flex items-center gap-1.5 text-sm font-bold text-nova-700 hover:text-nova-900"
            >
              {pt(lang, "home.faqMore")} →
            </a>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <section className="px-5 pb-20 sm:px-8">
        <div className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-[2rem]">
          <img
            src={photos.coupleLaptop}
            alt={pt(lang, "home.altCouple")}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-nova-950/95 via-nova-900/90 to-nova-800/80" />
          <div className="relative px-7 py-16 text-center sm:px-14">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {pt(lang, "home.ctaTitle")}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-nova-100">
              {pt(lang, "home.ctaText")}
            </p>
            <button
              onClick={() => goApply()}
              className="group mt-9 inline-flex items-center gap-2 rounded-2xl bg-mint-500 px-8 py-4 text-base font-extrabold text-nova-950 shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:bg-mint-400"
            >
              {pt(lang, "home.ctaButton")}
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </button>
            <p className="mt-4 text-sm text-nova-200">{pt(lang, "home.ctaNote")}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
