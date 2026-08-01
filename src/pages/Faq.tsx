import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { ArrowRight, ChevronDown, Search } from "lucide-react";
import { Eyebrow } from "../components/ui";
import { faqs, photos } from "../data";

export default function Faq() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [search, setSearch] = useState("");

  const filtered = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(search.toLowerCase()) ||
      f.a.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <main className="bg-slate-50">
      <Helmet>
        <title>FAQ · Prêt Nova</title>
        <meta name="description" content="Questions fréquentes sur le prêt personnel et professionnel Prêt Nova : taux, durée, justificatifs, remboursement anticipé." />
        <meta property="og:title" content="FAQ · Prêt Nova" />
        <meta property="og:description" content="Trouvez les réponses à vos questions sur le prêt Prêt Nova : taux, durée, justificatifs, remboursement." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pretnova.example/faq" />
        <meta property="og:locale" content="fr_FR" />
      </Helmet>

      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-nova-50/95 via-white/90 to-white" />
        <div className="absolute -top-40 -right-32 -z-10 h-[520px] w-[520px] rounded-full bg-nova-300/30 blur-3xl" />
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
          <Eyebrow>FAQ</Eyebrow>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-nova-950 sm:text-5xl">
            Questions fréquentes
          </h1>
          <p className="mt-4 max-w-xl text-lg text-slate-600">
            Tout ce que vous devez savoir avant de faire votre demande. Une autre question ? Écrivez-nous.
          </p>

          {/* Search */}
          <div className="relative mt-8 max-w-lg">
            <Search className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setOpenFaq(null); }}
              placeholder="Rechercher dans la FAQ…"
              className="w-full rounded-2xl border border-slate-200 bg-white py-4 pr-4 pl-12 text-sm outline-none placeholder:text-slate-400 focus:border-nova-400 focus:ring-4 focus:ring-nova-100"
            />
          </div>
        </div>
      </section>

      {/* FAQ list */}
      <section className="px-5 pb-24 sm:px-8">
        <div className="mx-auto w-full max-w-3xl">
          {filtered.length === 0 && (
            <p className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
              Aucun résultat pour « {search} ».
            </p>
          )}

          <div className="space-y-3">
            {filtered.map((f) => {
              const idx = faqs.indexOf(f);
              const open = openFaq === idx;
              return (
                <div
                  key={f.q}
                  className={`overflow-hidden rounded-2xl border transition ${
                    open ? "border-nova-300 bg-white" : "border-slate-200 bg-white/60"
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(open ? null : idx)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-bold text-nova-950">{f.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-nova-600 transition-transform ${open ? "rotate-180" : ""}`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ${
                      open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 text-sm leading-relaxed text-slate-600">{f.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Contact CTA */}
          <div className="mt-12 overflow-hidden rounded-3xl bg-white shadow-sm">
            <div className="grid md:grid-cols-2">
              <div className="p-8">
                <h2 className="text-xl font-extrabold text-nova-950">Vous ne trouvez pas votre réponse ?</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Notre équipe est joignable du lundi au samedi, de 9h à 19h. Réponse le jour même.
                </p>
                <div className="mt-6 space-y-2.5 text-sm">
                  <p><span className="font-semibold text-nova-800">Téléphone :</span> 01 80 00 00 00</p>
                  <p><span className="font-semibold text-nova-800">Email :</span> bonjour@pretnova.example</p>
                </div>
                <a
                  href="demande.html"
                  className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-nova-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-nova-600/25 transition hover:-translate-y-0.5 hover:bg-nova-700"
                >
                  Demander mon prêt <ArrowRight className="h-4 w-4" />
                </a>
              </div>
              <img
                src={photos.entrepreneur}
                alt="Service client Prêt Nova"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
