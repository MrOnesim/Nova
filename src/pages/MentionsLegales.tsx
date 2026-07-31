import { Helmet } from "react-helmet-async";
import { Eyebrow } from "../components/ui";

export default function MentionsLegales() {
  return (
    <main className="px-5 pt-28 pb-20 sm:px-8">
      <Helmet>
        <title>Mentions légales · Prêt Nova</title>
        <meta name="description" content="Mentions légales de Prêt Nova, intermédiaire en financement participatif enregistré à l'ORIAS." />
        <meta property="og:title" content="Mentions légales · Prêt Nova" />
        <meta property="og:description" content="Mentions légales de Prêt Nova, intermédiaire en financement participatif enregistré à l'ORIAS." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pretnova.example/mentions-legales" />
        <meta property="og:locale" content="fr_FR" />
      </Helmet>
      <div className="mx-auto w-full max-w-3xl">
        <Eyebrow>Informations légales</Eyebrow>
        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-nova-950 sm:text-4xl">
          Mentions légales
        </h1>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-slate-600">
          <section>
            <h2 className="text-lg font-bold text-nova-950">Éditeur du site</h2>
            <p className="mt-3">
              Le site <strong>pretnova.example</strong> est édité par la société Prêt Nova SAS, au capital de
              100 000 €, immatriculée au RCS de Paris sous le numéro 912 345 678.
            </p>
            <ul className="mt-3 space-y-1">
              <li>Siège social : 24 rue de la Boétie, 75008 Paris</li>
              <li>Numéro de téléphone : 01 80 00 00 00</li>
              <li>Adresse email : bonjour@pretnova.example</li>
              <li>Numéro de TVA intracommunautaire : FR12912345678</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-nova-950">Directeur de la publication</h2>
            <p className="mt-3">M. Alexandre Durand, Président de Prêt Nova SAS.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-nova-950">Hébergement</h2>
            <p className="mt-3">
              Ce site est hébergé par OVH SAS, 2 rue Kellermann, 59100 Roubaix, France.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-nova-950">Intermédiation bancaire</h2>
            <p className="mt-3">
              Prêt Nova SAS est un intermédiaire en financement participatif enregistré auprès de l'ORIAS sous
              le numéro 21 123 456. L'activité d'intermédiation en crédit à la consommation est réglementée par
              les articles L. 519-1 et suivants du Code monétaire et financier, transposant la directive
              européenne 2023/2225.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-nova-950">Propriété intellectuelle</h2>
            <p className="mt-3">
              L'ensemble des contenus du site (textes, graphismes, images, simulateur) est protégé par le droit
              d'auteur. Toute reproduction, représentation ou diffusion sans autorisation écrite préalable est
              interdite.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-nova-950">Crédits</h2>
            <p className="mt-3">
              Design et développement : Prêt Nova SAS. Icônes : Lucide. Photos : banques d'images libres de
              droit.
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
