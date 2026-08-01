import { Helmet } from "react-helmet-async";
import { BadgeCheck, Quote, Star } from "lucide-react";
import { Eyebrow } from "../components/ui";
import { testimonials } from "../data";

export default function Reviews() {
  return (
    <main className="bg-white">
      <Helmet>
        <title>Avis clients · Prêt Nova</title>
        <meta name="description" content="Découvrez les avis de nos clients : Camille, Yanis, Sofia et des milliers d'autres nous font confiance. Note 4,8/5." />
        <meta property="og:title" content="Avis clients · Prêt Nova" />
        <meta property="og:description" content="42 800 dossiers financés. Note 4,8/5. Découvrez les avis de nos clients." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pretnova.example/avis" />
        <meta property="og:locale" content="fr_FR" />
      </Helmet>

      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-nova-50/95 via-white/90 to-white" />
        <div className="absolute -top-40 -right-32 -z-10 h-[520px] w-[520px] rounded-full bg-nova-300/30 blur-3xl" />
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
          <Eyebrow>Avis clients</Eyebrow>
          <div className="mt-6 flex items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-nova-950 sm:text-5xl">
                Ils nous ont fait confiance
              </h1>
              <p className="mt-4 max-w-xl text-lg text-slate-600">
                Des projets concrets, des décisions sereines. Plus de 42 800 dossiers financés en zone Euro.
              </p>
            </div>
            <div className="hidden shrink-0 rounded-2xl bg-nova-50 p-5 text-center sm:block">
              <div className="flex items-center justify-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="mt-1 text-3xl font-extrabold text-nova-950">4,8/5</p>
              <p className="text-xs text-slate-500">42 800 avis vérifiés</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-5 pb-24 sm:px-8">
        <div className="mx-auto w-full max-w-6xl">
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="flex h-full flex-col rounded-3xl border border-slate-200/80 bg-white p-7 shadow-sm"
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
          </div>

          {/* Stats grid */}
          <div className="mt-16 grid gap-6 rounded-3xl bg-nova-950 p-8 text-white sm:grid-cols-4 sm:p-10">
            {[
              ["42 800+", "Dossiers financés"],
              ["4,8 / 5", "Note moyenne"],
              ["30 min", "Réponse moyenne"],
              ["94 %", "Taux d'acceptation"],
            ].map(([value, label]) => (
              <div key={label} className="text-center">
                <p className="text-3xl font-extrabold text-mint-400">{value}</p>
                <p className="mt-1 text-sm text-nova-200">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-100 px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-extrabold text-nova-950">
            Rejoignez nos clients satisfaits
          </h2>
          <p className="mt-3 text-slate-600">
            Simulation gratuite, réponse en 30 minutes, déblocage sous 24 h.
          </p>
          <a
            href="demande.html"
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-nova-600 px-7 py-4 text-base font-bold text-white shadow-xl shadow-nova-600/30 transition hover:-translate-y-0.5 hover:bg-nova-700"
          >
            Faire ma demande
          </a>
        </div>
      </section>
    </main>
  );
}
