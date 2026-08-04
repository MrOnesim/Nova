import { Clock3, Landmark, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { pt } from "../lib/content";
import { useLanguage } from "../lib/LanguageContext";
import { Logo } from "./Header";

export default function Footer() {
  const { lang } = useLanguage();
  return (
    <footer className="bg-nova-950 text-slate-300">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="[&_span]:!text-white">
            <Logo light />
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">{pt(lang, "footer.tagline")}</p>

          <div className="mt-6 flex flex-wrap gap-2.5">
            {[
              [ShieldCheck, pt(lang, "home.badge1")],
              [Landmark, pt(lang, "home.badge2")],
              [Clock3, pt(lang, "home.badge3")],
            ].map(([Icon, label]) => {
              const I = Icon as typeof ShieldCheck;
              const labelText = label as string;
              return (
                <span
                  key={labelText}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-300"
                >
                  <I className="h-3.5 w-3.5 text-mint-400" /> {labelText}
                </span>
              );
            })}
          </div>

          <div className="mt-6 space-y-2.5 text-sm text-slate-400">
            <p className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 text-mint-400" /> 07 56 91 67 74 · {pt(lang, "footer.hours")}
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
          <h4 className="text-sm font-bold tracking-wide text-white uppercase">{pt(lang, "footer.productsTitle")}</h4>
          <ul className="mt-4 space-y-3 text-sm">
            {[
              ["index.html#simulateur", pt(lang, "footer.linkSimulator")],
              ["index.html#simulateur", pt(lang, "footer.linkPersonal")],
              ["index.html#simulateur", pt(lang, "footer.linkProfessional")],
              ["comment-ca-marche.html", pt(lang, "footer.linkHowItWorks")],
              ["faq.html", pt(lang, "footer.linkFaq")],
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
          <h4 className="text-sm font-bold tracking-wide text-white uppercase">{pt(lang, "footer.legalTitle")}</h4>
          <ul className="mt-4 space-y-3 text-sm">
            {[
              ["mentions-legales.html", pt(lang, "footer.legalMentions")],
              ["politique-confidentialite.html", pt(lang, "footer.legalPrivacy")],
              ["gestion-cookies.html", pt(lang, "footer.legalCookies")],
              ["information-precontractuelle.html", pt(lang, "footer.legalInfo")],
              ["reclamations.html", pt(lang, "footer.legalClaims")],
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
          <p>
            © {new Date().getFullYear()} Prêt Nova. {pt(lang, "footer.demo")}
          </p>
          <p className="max-w-3xl md:text-right">{pt(lang, "footer.exemple")}</p>
        </div>
      </div>
    </footer>
  );
}
