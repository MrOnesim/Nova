import { Helmet } from "react-helmet-async";
import { Eyebrow } from "../components/ui";

export default function GestionCookies() {
  return (
    <main className="px-5 pt-28 pb-20 sm:px-8">
      <Helmet>
        <title>Gestion des cookies · Prêt Nova</title>
        <meta name="description" content="Gérez vos préférences de cookies sur le site Prêt Nova." />
        <meta property="og:title" content="Gestion des cookies · Prêt Nova" />
        <meta property="og:description" content="Politique et paramétrage des cookies sur Prêt Nova." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pretnova.example/gestion-cookies" />
        <meta property="og:locale" content="fr_FR" />
      </Helmet>
      <div className="mx-auto w-full max-w-3xl">
        <Eyebrow>Cookies</Eyebrow>
        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-nova-950 sm:text-4xl">
          Gestion des cookies
        </h1>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-slate-600">
          <section>
            <h2 className="text-lg font-bold text-nova-950">Qu'est-ce qu'un cookie ?</h2>
            <p className="mt-3">
              Un cookie est un fichier texte déposé sur votre terminal lors de la visite d'un site. Il permet
              de stocker des informations relatives à votre navigation pour diverses finalités.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-nova-950">Cookies utilisés sur ce site</h2>
            <div className="mt-4 space-y-4">
              <div className="rounded-2xl border border-slate-200 p-4">
                <h3 className="font-bold text-nova-950">Cookies strictement nécessaires</h3>
                <p className="mt-1 text-xs">Session, maintien de la simulation, sécurité. Pas de consentement requis.</p>
              </div>
              <div className="rounded-2xl border border-slate-200 p-4">
                <h3 className="font-bold text-nova-950">Cookies fonctionnels</h3>
                <p className="mt-1 text-xs">Sauvegarde de vos préférences (simulation, langue). Consentement requis.</p>
              </div>
              <div className="rounded-2xl border border-slate-200 p-4">
                <h3 className="font-bold text-nova-950">Cookies de mesure d'audience</h3>
                <p className="mt-1 text-xs">Analyse anonyme de la fréquentation du site. Consentement requis.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-nova-950">Paramétrage des cookies</h2>
            <p className="mt-3">
              Vous pouvez paramétrer vos préférences à tout moment depuis le panneau de gestion des cookies
              accessible en bas de page. Vous pouvez également configurer votre navigateur pour refuser les
              cookies.
            </p>
          </section>

          <p className="border-t border-slate-200 pt-6 text-xs text-slate-400">
            Dernière mise à jour : juillet 2026.
          </p>
        </div>
      </div>
    </main>
  );
}
