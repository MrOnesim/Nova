import { Helmet } from "react-helmet-async";
import { Eyebrow } from "../components/ui";

export default function Reclamations() {
  return (
    <main className="px-5 pt-28 pb-20 sm:px-8">
      <Helmet>
        <title>Réclamations & médiation · Prêt Nova</title>
        <meta name="description" content="Déposez une réclamation auprès de Prêt Nova ou saisissez le médiateur de la consommation." />
        <meta property="og:title" content="Réclamations & médiation · Prêt Nova" />
        <meta property="og:description" content="Déposez une réclamation auprès de Prêt Nova ou saisissez le médiateur." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pretnova.example/reclamations" />
        <meta property="og:locale" content="fr_FR" />
      </Helmet>
      <div className="mx-auto w-full max-w-3xl">
        <Eyebrow>Service réclamation</Eyebrow>
        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-nova-950 sm:text-4xl">
          Réclamations & médiation
        </h1>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-slate-600">
          <section>
            <h2 className="text-lg font-bold text-nova-950">Déposer une réclamation</h2>
            <p className="mt-3">
              Si vous estimez que nos services n'ont pas répondu à vos attentes, vous pouvez déposer une
              réclamation par email à reclamations@pretnova.example ou par courrier recommandé à l'adresse
              suivante :
            </p>
            <div className="mt-4 rounded-2xl bg-slate-50 p-5">
              <p className="font-semibold text-nova-950">Service Réclamations — Prêt Nova SAS</p>
              <p className="mt-1 text-slate-600">24 rue de la Boétie, 75008 Paris</p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-nova-950">Délai de traitement</h2>
            <p className="mt-3">
              Nous accusons réception de votre réclamation sous 5 jours ouvrés et nous nous engageons à vous
              apporter une réponse motivée sous 15 jours ouvrés. Si des circonstances exceptionnelles le
              justifient, ce délai peut être porté à 30 jours, avec information préalable.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-nova-950">Médiateur de la consommation</h2>
            <p className="mt-3">
              Si la réponse apportée ne vous satisfait pas ou en l'absence de réponse dans le délai imparti,
              vous pouvez saisir gratuitement le Médiateur de la consommation dont les coordonnées figurent sur
              notre site ou vous sont communiquées sur demande. Le médiateur doit être saisi dans un délai d'un
              an à compter de la réclamation initiale.
            </p>
            <p className="mt-4">
              Plateforme européenne de règlement en ligne des litiges (RLL) :{" "}
              <span className="font-medium text-nova-700">https://ec.europa.eu/consumers/odr</span>.
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
