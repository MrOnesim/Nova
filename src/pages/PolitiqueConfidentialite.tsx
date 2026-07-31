import { Helmet } from "react-helmet-async";
import { Eyebrow } from "../components/ui";

export default function PolitiqueConfidentialite() {
  return (
    <main className="px-5 pt-28 pb-20 sm:px-8">
      <Helmet>
        <title>Politique de confidentialité · Prêt Nova</title>
        <meta name="description" content="Politique de confidentialité de Prêt Nova : données collectées, finalités, durée de conservation et droits RGPD." />
        <meta property="og:title" content="Politique de confidentialité · Prêt Nova" />
        <meta property="og:description" content="Politique de confidentialité de Prêt Nova : données collectées, finalités, durée de conservation et droits RGPD." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pretnova.example/politique-confidentialite" />
        <meta property="og:locale" content="fr_FR" />
      </Helmet>
      <div className="mx-auto w-full max-w-3xl">
        <Eyebrow>Protection des données</Eyebrow>
        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-nova-950 sm:text-4xl">
          Politique de confidentialité
        </h1>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-slate-600">
          <section>
            <h2 className="text-lg font-bold text-nova-950">Responsable du traitement</h2>
            <p className="mt-3">
              Le responsable du traitement des données personnelles est Prêt Nova SAS, 24 rue de la Boétie,
              75008 Paris.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-nova-950">Données collectées</h2>
            <p className="mt-3">
              Nous collectons les catégories de données suivantes : identité (nom, prénom), coordonnées (email,
              téléphone, adresse), situation professionnelle (emploi, revenus, charges), données financières
              (montant du prêt, IBAN), et données techniques (adresse IP, cookies, navigateur).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-nova-950">Finalités et base légale</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Étude des demandes de prêt (intérêt légitime et mesures précontractuelles)</li>
              <li>Vérification d'identité et lutte contre la fraude (obligation légale)</li>
              <li>Communication sur le suivi des dossiers (exécution contractuelle)</li>
              <li>Envoi d'offres promotionnelles (consentement)</li>
              <li>Amélioration du site et mesures d'audience (consentement)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-nova-950">Destinataires des données</h2>
            <p className="mt-3">
              Vos données sont communiquées à nos partenaires bancaires agréés dans le cadre de l'étude de votre
              dossier, et aux sous-traitants techniques (hébergeur, service email) strictement nécessaires.
              Aucune donnée n'est cédée à des tiers à des fins commerciales sans votre consentement.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-nova-950">Durée de conservation</h2>
            <p className="mt-3">
              Les données sont conservées pendant la durée de la relation contractuelle, puis archivées
              conformément aux obligations légales (5 ans pour les données comptables, 2 ans pour les données
              de prospection).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-nova-950">Vos droits</h2>
            <p className="mt-3">
              Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, d'effacement, de
              limitation, de portabilité et d'opposition. Pour les exercer, écrivez à dpo@pretnova.example ou
              par courrier à notre siège social.
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
