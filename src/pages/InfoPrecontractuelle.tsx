import { Helmet } from "react-helmet-async";
import { Eyebrow } from "../components/ui";

export default function InfoPrecontractuelle() {
  return (
    <main className="px-5 pt-28 pb-20 sm:px-8">
      <Helmet>
        <title>Information précontractuelle · Prêt Nova</title>
        <meta name="description" content="Information précontractuelle européenne normalisée (FIPEN) pour les crédits à la consommation Prêt Nova." />
        <meta property="og:title" content="Information précontractuelle · Prêt Nova" />
        <meta property="og:description" content="Information précontractuelle européenne normalisée pour les crédits à la consommation." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pretnova.example/information-precontractuelle" />
        <meta property="og:locale" content="fr_FR" />
      </Helmet>
      <div className="mx-auto w-full max-w-3xl">
        <Eyebrow>Information réglementée</Eyebrow>
        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-nova-950 sm:text-4xl">
          Information précontractuelle
        </h1>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-slate-600">
          <section>
            <h2 className="text-lg font-bold text-nova-950">Crédit à la consommation</h2>
            <p className="mt-3">
              Conformément aux articles L. 311-6 et suivants du Code de la consommation et à la directive
              européenne 2023/2225, toute demande de prêt fait l'objet d'une fiche d'information précontractuelle
              européenne (FIPEN) remise avant la signature du contrat.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-nova-950">Exemple représentatif</h2>
            <p className="mt-3">
              Prêt personnel de 1 000 € à 10 700 % TANN fixe sur 18 mois :
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li>TAEG fixe : 14,3 %</li>
              <li>18 mensualités de 62,06 €</li>
              <li>Montant total dû (MTIC) : 1 139,69 €</li>
              <li>Intérêts : 117,01 €</li>
              <li>Droits de timbre : 6,08 €</li>
              <li>Frais de dossier : 17,60 €</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-nova-950">Délai de rétractation</h2>
            <p className="mt-3">
              Vous disposez d'un délai de 14 jours calendaires pour exercer votre droit de rétractation sans
              motif ni pénalité, à compter de la signature du contrat.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-nova-950">Remboursement anticipé</h2>
            <p className="mt-3">
              Le remboursement anticipé est autorisé à tout moment. L'indemnité éventuelle est plafonnée à 3 %
              du capital restant dû si la durée résiduelle est supérieure à un an, ou à 1 % si elle est
              inférieure à un an. Aucune indemnité n'est due si le remboursement anticipé est consécutif à la
              mise en jeu d'une assurance.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-nova-950">Médiation</h2>
            <p className="mt-3">
              En cas de litige persistant, vous pouvez saisir le Médiateur de la consommation à l'adresse
              mediateur@consommation.example.
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
