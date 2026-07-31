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

const icons: Record<string, typeof Zap> = {
  Zap,
  ShieldCheck,
  Landmark,
  LockKeyhole,
  UserCheck,
  Headphones,
};

export default function Home() {
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
    window.location.href = "/demande";
  };

  return (
    <main>
      <Helmet>
        <title>Prêt Nova · Simulateur de prêt personnel en ligne</title>
        <meta name="description" content="Simulateur de prêt personnel en ligne : de 1 000 € à 75 000 € à taux fixe. Réponse en 30 minutes, sécurisé, transparent et conçu pour la zone Euro." />
        <meta property="og:title" content="Prêt Nova · Simulateur de prêt personnel en ligne" />
        <meta property="og:description" content="Simulez et obtenez votre prêt personnel en ligne. De 1 000 € à 75 000 €, réponse en 30 minutes, sans engagement." />
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
              <span className="h-1.5 w-1.5 rounded-full bg-mint-500" /> Crédit responsable en zone Euro
            </Eyebrow>
            <h1 className="mt-6 text-4xl leading-[1.05] font-extrabold tracking-tight text-nova-950 sm:text-5xl lg:text-6xl">
              Simulateur de prêt personnel{" "}
              <span className="bg-gradient-to-r from-nova-600 to-mint-500 bg-clip-text text-transparent">
                en ligne
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
              Obtenez votre prêt approuvé en seulement 30 minutes. Sécurisé, transparent et conçu pour la zone
              Euro : de 1 000 € à 75 000 €, à taux fixe, sans caution.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#simulateur"
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-nova-600 px-7 py-4 text-base font-bold text-white shadow-xl shadow-nova-600/30 transition hover:-translate-y-0.5 hover:bg-nova-700"
              >
                Lancer la simulation
                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </a>
              <button
                onClick={() => goApply()}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-nova-100 bg-white px-7 py-4 text-base font-bold text-nova-800 transition hover:border-nova-300 hover:bg-nova-50"
              >
                Faire ma demande
              </button>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3">
              {[
                [ShieldCheck, "Sécurité bancaire"],
                [Landmark, "Réglementé UE"],
                [Clock3, "Livraison 30 min"],
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
                <p className="text-xs text-slate-500">42 800 dossiers financés en Europe</p>
              </div>
            </div>
          </div>

          {/* Hero image collage */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src={photos.heroWoman}
                  alt="Cliente consultant son prêt sur mobile"
                  className="h-64 w-full rounded-3xl object-cover shadow-xl shadow-nova-900/10"
                />
                <img
                  src={photos.kitchen}
                  alt="Cuisine rénovée grâce à un prêt travaux"
                  loading="lazy"
                  className="h-40 w-full rounded-3xl object-cover shadow-xl shadow-nova-900/10"
                />
              </div>
              <div className="space-y-4 pt-10">
                <img
                  src={photos.cafeOwner}
                  alt="Commerçante financée par un prêt professionnel"
                  loading="lazy"
                  className="h-40 w-full rounded-3xl object-cover shadow-xl shadow-nova-900/10"
                />
                <img
                  src={photos.familyHome}
                  alt="Couple préparant son projet de financement"
                  loading="lazy"
                  className="h-64 w-full rounded-3xl object-cover shadow-xl shadow-nova-900/10"
                />
              </div>
            </div>

            <div className="animate-floaty absolute -bottom-6 -left-4 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-2xl backdrop-blur">
              <p className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">Accord de principe</p>
              <p className="text-2xl font-extrabold text-nova-800">30 min</p>
              <p className="text-xs text-mint-600">● Dossiers traités en direct</p>
            </div>
          </div>
        </div>
      </section>

      {/* SIMULATOR */}
      <section className="px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-8 max-w-2xl">
            <Eyebrow>Simulateur</Eyebrow>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-nova-950 sm:text-4xl">
              Calculez votre mensualité au centime près
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Montant, durée, profil : chaque paramètre met à jour instantanément le TANN, le TAEG et le coût
              total imputé au consommateur.
            </p>
          </div>
          <Simulator onApply={(r) => goApply(r)} />
        </div>
      </section>

      {/* PROJECTS GALLERY */}
      <Section className="bg-white">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <Eyebrow>Vos projets</Eyebrow>
            <h2 className="reveal mt-5 text-3xl font-extrabold tracking-tight text-nova-950 sm:text-4xl">
              Un financement pour chaque étape de votre vie
            </h2>
          </div>
          <a href="#simulateur" className="reveal font-bold text-nova-700 hover:text-nova-900">
            Simuler mon projet →
          </a>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((p, i) => (
            <article
              key={p.title}
              className="reveal group relative overflow-hidden rounded-3xl"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <img
                src={p.photo}
                alt={p.title}
                loading="lazy"
                className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-nova-950/85 via-nova-950/25 to-transparent" />
              <div className="absolute right-5 bottom-5 left-5 text-white">
                <p className="text-lg font-extrabold">{p.title}</p>
                <p className="text-sm text-nova-100">{p.amount}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* FEATURES */}
      <Section id="ventajas" className="bg-slate-50">
        <div className="max-w-2xl">
          <Eyebrow>Pourquoi Nova</Eyebrow>
          <h2 className="reveal mt-5 text-3xl font-extrabold tracking-tight text-nova-950 sm:text-4xl">
            Tout ce qu'on attend d'un prêt, sans ce qu'on redoute
          </h2>
          <p className="reveal mt-4 text-lg text-slate-600">
            Moins de paperasse, plus de transparence, et une personne joignable au bout du fil quand il le
            faut.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => {
            const Icon = icons[f.icon];
            return (
              <article
                key={f.title}
                className="reveal group rounded-3xl border border-slate-200/80 bg-white p-7 transition hover:-translate-y-1 hover:border-nova-200 hover:shadow-[0_28px_60px_-32px_rgba(14,42,114,0.4)]"
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <span className="inline-flex h-13 w-13 items-center justify-center rounded-2xl bg-nova-50 p-3.5 text-nova-600 transition group-hover:bg-nova-600 group-hover:text-white">
                  <Icon className="h-6 w-6" strokeWidth={2.2} />
                </span>
                <h3 className="mt-5 text-lg font-bold text-nova-950">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.text}</p>
              </article>
            );
          })}
        </div>
      </Section>

      {/* STATS */}
      <Section className="bg-nova-950 text-white">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="reveal text-center">
              <p className="text-4xl font-extrabold tracking-tight text-mint-400 lg:text-5xl">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-3 text-sm font-medium text-nova-200">{s.label}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* HOW IT WORKS — preview */}
      <Section id="como-funciona" className="bg-white">
        <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <Eyebrow>Comment ça marche</Eyebrow>
            <h2 className="reveal mt-5 text-3xl font-extrabold tracking-tight text-nova-950 sm:text-4xl">
              Quatre étapes, 30 minutes chrono
            </h2>
            <p className="reveal mt-4 text-lg text-slate-600">
              Aucun déplacement, aucun envoi postal. Vous commencez sur mobile et terminez par une signature
              électronique.
            </p>
            <img
              src={photos.advisor}
              alt="Conseillère Nova en déplacement"
              loading="lazy"
              className="reveal mt-8 h-60 w-full rounded-3xl object-cover"
            />
            <a
              href="/comment-ca-marche"
              className="reveal mt-7 inline-flex items-center gap-2 rounded-2xl bg-nova-600 px-6 py-3.5 font-bold text-white shadow-lg shadow-nova-600/25 transition hover:-translate-y-0.5 hover:bg-nova-700"
            >
              Voir toutes les étapes <ArrowRight className="h-5 w-5" />
            </a>
          </div>

          <div className="space-y-6">
            {steps.slice(0, 2).map((s, i) => (
              <div key={s.title} className="reveal rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm" style={{ animationDelay: `${i * 90}ms` }}>
                <h3 className="text-lg font-bold text-nova-950">
                  <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-nova-600 text-xs font-extrabold text-white">{i + 1}</span>
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.text}</p>
              </div>
            ))}
            <a
              href="/comment-ca-marche"
              className="reveal mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-nova-700 hover:text-nova-900"
            >
              Voir les 4 étapes détaillées →
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
              alt="Signature électronique du contrat de prêt"
              loading="lazy"
              className="col-span-3 h-56 w-full rounded-3xl object-cover"
            />
            <img
              src={photos.desk}
              alt="Bureau de conseiller financier"
              loading="lazy"
              className="h-44 w-full rounded-3xl object-cover"
            />
            <img
              src={photos.euroCoins}
              alt="Pièces en euro symbolisant l'épargne"
              loading="lazy"
              className="h-44 w-full rounded-3xl object-cover"
            />
            <img
              src={photos.manPhone}
              alt="Client suivant son dossier depuis son mobile"
              loading="lazy"
              className="h-44 w-full rounded-3xl object-cover"
            />
          </div>
          <div className="reveal">
            <Eyebrow>Transparence</Eyebrow>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-nova-950 sm:text-4xl">
              Chaque euro est justifié, avant la signature
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Notre simulateur détaille le capital, les intérêts, les droits de timbre et les frais de
              dossier. Vous savez exactement ce que vous remboursez.
            </p>
            <ul className="mt-7 space-y-3.5">
              {[
                "Taux fixe garanti sur toute la durée du contrat",
                "Aucun frais de dossier caché : montant annoncé, montant facturé",
                "Remboursement anticipé possible à tout moment",
                "Information précontractuelle européenne normalisée fournie",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-mint-500" />
                  <span className="font-medium">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* TESTIMONIALS — preview */}
      <Section id="opiniones" className="bg-white">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Avis clients</Eyebrow>
          <h2 className="reveal mt-5 text-3xl font-extrabold tracking-tight text-nova-950 sm:text-4xl">
            Des projets concrets, des décisions sereines
          </h2>
          <p className="reveal mt-4 text-slate-600">Note moyenne <strong className="text-nova-950">4,8/5</strong> sur 42 800 avis vérifiés.</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.slice(0, 2).map((t, i) => (
            <figure
              key={t.name}
              className="reveal flex h-full flex-col rounded-3xl border border-slate-200/80 bg-white p-7 shadow-sm"
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <Quote className="h-8 w-8 text-nova-200" />
              <blockquote className="mt-4 flex-1 leading-relaxed text-slate-700">« {t.quote} »</blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
                <span className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold text-white ${t.color}`}>{t.initials}</span>
                <span>
                  <span className="block font-bold text-nova-950">{t.name}</span>
                  <span className="block text-xs text-slate-500">{t.city}</span>
                </span>
                <BadgeCheck className="ml-auto h-5 w-5 text-mint-500" />
              </figcaption>
            </figure>
          ))}
          <a
            href="/avis"
            className="reveal flex h-full min-h-[260px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-white/60 p-7 text-center transition hover:border-nova-300 hover:bg-white"
            style={{ animationDelay: `${1 * 90}ms` }}
          >
            <span className="text-4xl font-extrabold text-nova-600">4,8/5</span>
            <p className="mt-2 text-sm text-slate-600">Voir tous les avis →</p>
          </a>
        </div>
      </Section>

      {/* FAQ — preview */}
      <Section id="faq" className="bg-slate-50">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow>Questions fréquentes</Eyebrow>
            <h2 className="reveal mt-5 text-3xl font-extrabold tracking-tight text-nova-950 sm:text-4xl">
              On répond à vos doutes
            </h2>
            <p className="reveal mt-4 text-slate-600">
              Les 6 questions les plus posées.{" "}
              <a href="/faq" className="font-semibold text-nova-700 underline underline-offset-2 hover:text-nova-900">
                Voir la FAQ complète
              </a>
            </p>
            <a
              href="/faq"
              className="reveal mt-6 inline-flex items-center gap-2 rounded-2xl bg-nova-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-nova-600/25 transition hover:-translate-y-0.5 hover:bg-nova-700"
            >
              Tout savoir <ArrowRight className="h-4 w-4" />
            </a>
            <img
              src={photos.entrepreneur}
              alt="Entrepreneure accompagnée par Nova"
              loading="lazy"
              className="reveal mt-8 hidden h-64 w-full rounded-3xl object-cover lg:block"
            />
          </div>

          <div className="space-y-3">
            {faqs.slice(0, 3).map((f) => (
              <div
                key={f.q}
                className="reveal rounded-2xl border border-slate-200 bg-white/80 px-6 py-5"
              >
                <p className="font-bold text-nova-950">{f.q}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.a}</p>
              </div>
            ))}
            <a
              href="/faq"
              className="reveal mt-2 inline-flex items-center gap-1.5 text-sm font-bold text-nova-700 hover:text-nova-900"
            >
              Voir les 6 questions →
            </a>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <section className="px-5 pb-20 sm:px-8">
        <div className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-[2rem]">
          <img
            src={photos.coupleLaptop}
            alt="Couple validant sa demande de prêt"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-nova-950/95 via-nova-900/90 to-nova-800/80" />
          <div className="relative px-7 py-16 text-center sm:px-14">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Prêt à financer votre projet ?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-nova-100">
              Complétez la demande en moins de 5 minutes et recevez une réponse de principe en 30 minutes.
            </p>
            <button
              onClick={() => goApply()}
              className="group mt-9 inline-flex items-center gap-2 rounded-2xl bg-mint-500 px-8 py-4 text-base font-extrabold text-nova-950 shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:bg-mint-400"
            >
              Demander mon prêt
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </button>
            <p className="mt-4 text-sm text-nova-200">Sans frais · Sans engagement · Sans caution</p>
          </div>
        </div>
      </section>
    </main>
  );
}
