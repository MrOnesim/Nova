import { Clock3, Landmark, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { Logo } from "./Header";

export default function Footer() {
  return (
    <footer className="bg-nova-950 text-slate-300">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="[&_span]:!text-white">
            <Logo light />
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">
            Plateforme européenne de simulation et d'intermédiation en crédit à la consommation. Nous
            comparons les barèmes de nos partenaires agréés pour vous proposer une offre claire, à taux fixe,
            adaptée à votre budget.
          </p>

          <div className="mt-6 flex flex-wrap gap-2.5">
            {[
              [ShieldCheck, "Sécurité bancaire"],
              [Landmark, "Réglementé UE"],
              [Clock3, "Livraison 30 min"],
            ].map(([Icon, label]) => {
              const I = Icon as typeof ShieldCheck;
              return (
                <span
                  key={label as string}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-300"
                >
                  <I className="h-3.5 w-3.5 text-mint-400" /> {label as string}
                </span>
              );
            })}
          </div>

          <div className="mt-6 space-y-2.5 text-sm text-slate-400">
            <p className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 text-mint-400" /> 01 80 00 00 00 · Lun-Sam, 9h-19h
            </p>
            <p className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 text-mint-400" /> bonjour@pretnova.example
            </p>
            <p className="flex items-center gap-2.5">
              <MapPin className="h-4 w-4 text-mint-400" /> 24 rue de la Boétie, 75008 Paris
            </p>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold tracking-wide text-white uppercase">Produits</h4>
          <ul className="mt-4 space-y-3 text-sm">
            {[
              ["index.html#simulateur", "Simulateur de prêt"],
              ["index.html#simulateur", "Prêt personnel"],
              ["index.html#simulateur", "Prêt professionnel"],
              ["comment-ca-marche.html", "Comment ça marche"],
              ["faq.html", "Questions fréquentes"],
            ].map(([href, label], i) => (
              <li key={`${label}-${i}`}>
                <a href={href as string} className="transition hover:text-mint-400">
                  {label as string}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold tracking-wide text-white uppercase">Informations légales</h4>
          <ul className="mt-4 space-y-3 text-sm">
            {[
              ["mentions-legales.html", "Mentions légales"],
              ["politique-confidentialite.html", "Politique de confidentialité"],
              ["gestion-cookies.html", "Gestion des cookies"],
              ["information-precontractuelle.html", "Information précontractuelle"],
              ["reclamations.html", "Réclamations & médiation"],
            ].map(([path, label]) => (
              <li key={label as string}>
                <a href={path as string} className="transition hover:text-mint-400">
                  {label as string}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-5 py-6 sm:px-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 text-xs leading-relaxed text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Prêt Nova. Site de démonstration.</p>
          <p className="max-w-3xl md:text-right">
            Exemple représentatif : prêt personnel de 1 000 € sur 18 mois, TANN fixe 10,700 %, TAEG 14,3 %,
            18 mensualités de 62,06 €, MTIC 1 139,69 € (intérêts 117,01 €, droits de timbre 5,08 €, frais
            17,60 €). Un crédit vous engage et doit être remboursé. Offre soumise à étude et acceptation.
          </p>
        </div>
      </div>
    </footer>
  );
}
