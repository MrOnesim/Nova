import { useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Building2,
  Check,
  CheckCircle2,
  Clock3,
  FileText,
  Home,
  Image,
  Landmark,
  Lock,
  Mail,
  PartyPopper,
  Phone,
  ShieldCheck,
  Sparkles,
  Upload,
  User,
  Wallet,
} from "lucide-react";
import { computeSimulation, type SimulationResult } from "../components/Simulator";
import { personalPurposes, photos, proPurposes } from "../data";
import { validateEmail, validateIBAN, validatePhone } from "../lib/validate";
import { detectCountry, getCountryByName, countryNames, t, type Lang } from "../lib/locale";

const nf = (n: number, d = 2) =>
  n.toLocaleString("fr-FR", { minimumFractionDigits: d, maximumFractionDigits: d });
const euro = (n: number, d = 2) => `${nf(n, d)} €`;
const currency = (n: number, sym: string, d = 2) => `${nf(n, d)} ${sym}`;

const stepTitles = ["Votre prêt", "Votre identité", "Votre situation", "Récapitulatif"];

const employmentOptions = [
  { id: "cdi", label: "CDI", icon: Briefcase },
  { id: "cdd", label: "CDD / intérim", icon: Clock3 },
  { id: "independant", label: "Indépendant", icon: Building2 },
  { id: "fonctionnaire", label: "Fonctionnaire", icon: Landmark },
  { id: "retraite", label: "Retraité", icon: User },
  { id: "autre", label: "Autre situation", icon: FileText },
];

const housingOptions = ["Locataire", "Propriétaire", "Hébergé", "Logement de fonction"];

type Form = {
  kind: SimulationResult["kind"];
  profile: SimulationResult["profile"];
  purpose: string;
  amount: number;
  months: number;
  civility: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birth: string;
  country: string;
  city: string;
  employment: string;
  seniority: string;
  income: string;
  charges: string;
  housing: string;
  iban: string;
  identityRecto: File | null;
  identityVerso: File | null;
  incomeFile: File | null;
  consent: boolean;
  marketing: boolean;
};

export default function Apply() {
  const detected = useMemo(() => detectCountry(), []);
  const [lang] = useState<Lang>(detected.lang);

  const prefill: SimulationResult | undefined = (() => {
    const raw = sessionStorage.getItem("pretnova-prefill");
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as SimulationResult;
        sessionStorage.removeItem("pretnova-prefill");
        return parsed;
      } catch {}
    }
    return undefined;
  })();

  const [step, setStep] = useState(0);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const refNumber = `NOVA-${String(Math.floor(Math.random() * 900000) + 100000)}`;
  const [form, setForm] = useState<Form>({
    kind: prefill?.kind ?? "personnel",
    profile: prefill?.profile ?? "particuliers",
    purpose: prefill?.purpose ?? personalPurposes[0].label,
    amount: prefill?.amount ?? 10000,
    months: prefill?.months ?? 36,
    civility: "Mme",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birth: "",
    country: detected.name,
    city: "",
    employment: "cdi",
    seniority: "1 à 3 ans",
    income: "",
    charges: "",
    housing: housingOptions[0],
    iban: "",
    identityRecto: null,
    identityVerso: null,
    incomeFile: null,
    consent: false,
    marketing: true,
  });

  const set = <K extends keyof Form>(k: K, v: Form[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const sim = useMemo(
    () => computeSimulation(form.kind, form.profile, form.purpose, form.amount, form.months),
    [form.kind, form.profile, form.purpose, form.amount, form.months],
  );

  const countryInfo = useMemo(() => getCountryByName(form.country), [form.country]);
  const purposeList = form.kind === "personnel" ? personalPurposes : proPurposes;

  const rateEffort = useMemo(() => {
    const inc = Number(form.income);
    if (!inc) return null;
    return Math.round(((sim.monthly + Number(form.charges || 0)) / inc) * 100);
  }, [form.income, form.charges, sim.monthly]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (step === 1) {
      if (form.firstName.trim().length < 2) e.firstName = "Indiquez votre prénom";
      if (form.lastName.trim().length < 2) e.lastName = "Indiquez votre nom";
      const emailErr = validateEmail(form.email);
      if (emailErr) e.email = emailErr;
      const phoneErr = validatePhone(form.phone);
      if (phoneErr) e.phone = phoneErr;
      if (!form.birth) e.birth = "Indiquez votre date de naissance";
      else {
        const age = (Date.now() - new Date(form.birth).getTime()) / 31557600000;
        if (age < 18) e.birth = "Vous devez être majeur";
        if (age > 90) e.birth = "Date de naissance invalide";
      }
      if (form.country !== "France" && form.city.trim().length < 2) e.city = "Indiquez votre ville";
      if (form.country === "France" && form.city.trim().length < 2) e.city = "Indiquez votre ville";
    }
    if (step === 2) {
      if (!form.income || Number(form.income) < 300) e.income = "Revenu net mensuel requis (min. 300 €)";
      if (form.charges && Number(form.charges) < 0) e.charges = "Montant invalide";
      const ibanErr = validateIBAN(form.iban);
      if (ibanErr) e.iban = ibanErr;
    }
    if (step === 3 && !form.consent) e.consent = "Vous devez accepter la politique de confidentialité";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validate()) return;
    if (step === 3) {
      setSubmitting(true);
      window.scrollTo({ top: 120, behavior: "smooth" });
      setTimeout(() => {
        setSubmitting(false);
        setSent(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 2500);
      return;
    }
    setStep((s) => s + 1);
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  const field = (key: string) =>
    `w-full rounded-xl border bg-white px-4 py-3 text-sm font-medium text-nova-950 outline-none transition placeholder:font-normal placeholder:text-slate-400 focus:ring-4 ${
      errors[key]
        ? "border-rose-400 focus:ring-rose-100"
        : "border-slate-200 focus:border-nova-500 focus:ring-nova-100"
    }`;

  const Err = ({ k }: { k: string }) =>
    errors[k] ? <p className="mt-1.5 text-xs font-semibold text-rose-500">{errors[k]}</p> : null;

  function FileUpload({ label, accept, fileName, onSelect }: { label: string; accept: string; fileName: string | null; onSelect: (f: File | null) => void }) {
    const ref = useRef<HTMLInputElement>(null);
    return (
      <div>
        <p className="mb-1.5 text-sm font-semibold text-slate-600">{label}</p>
        <button
          type="button"
          onClick={() => ref.current?.click()}
          className={`flex w-full items-center gap-3 rounded-xl border-2 border-dashed px-4 py-5 text-left text-sm transition hover:border-nova-400 ${
            fileName ? "border-mint-400 bg-mint-50" : "border-slate-200 bg-white"
          }`}
        >
          <Upload className={`h-5 w-5 shrink-0 ${fileName ? "text-mint-600" : "text-slate-400"}`} />
          <span className="flex-1 truncate font-medium text-slate-700">
            {fileName ?? "Choisir un fichier"}
          </span>
          {fileName && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onSelect(null); if (ref.current) ref.current.value = ""; }}
              className="rounded-full p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-600"
              aria-label="Supprimer"
            >
              <span className="text-lg leading-none">&times;</span>
            </button>
          )}
        </button>
        <input ref={ref} type="file" accept={accept} className="hidden" onChange={(e) => onSelect(e.target.files?.[0] ?? null)} />
      </div>
    );
  }

  const st = stepTitles.map((_, i) => t(lang, ["step1Title","step2Title","step3Title","step4Title"][i]));

  if (submitting) {
    return (
      <main className="bg-slate-50 px-5 pt-28 pb-24 sm:px-8">
        <Helmet>
          <title>Analyse de votre dossier · Prêt Nova</title>
          <meta name="description" content="Votre demande de prêt est en cours d'analyse." />
          <meta property="og:title" content="Demande en cours · Prêt Nova" />
          <meta property="og:description" content="Votre demande de prêt est en cours d'analyse." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://pretnova.example/demande" />
          <meta property="og:locale" content={countryInfo.locale} />
        </Helmet>
        <div className="mx-auto flex max-w-lg flex-col items-center justify-center py-24 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-nova-50">
            <span className="h-8 w-8 animate-spin rounded-full border-4 border-nova-200 border-t-nova-600" />
          </span>
          <h1 className="mt-7 text-2xl font-extrabold tracking-tight text-nova-950">
            Analyse de votre dossier
          </h1>
          <p className="mt-3 leading-relaxed text-slate-600">
            Nous vérifions les informations transmises. Vous recevrez une réponse de principe
            sous quelques instants.
          </p>
          <div className="mt-8 flex gap-2">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="h-2.5 w-2.5 animate-pulse rounded-full bg-nova-500"
                style={{ animationDelay: `${i * 300}ms`, animationDuration: "1.2s" }}
              />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (sent) {
    return (
      <main className="bg-slate-50 px-5 pt-28 pb-24 sm:px-8">
        <Helmet>
          <title>Demande envoyée · Prêt Nova</title>
          <meta name="description" content="Votre demande de prêt a été envoyée avec succès." />
          <meta property="og:title" content="Demande envoyée · Prêt Nova" />
          <meta property="og:description" content="Votre demande de prêt a été envoyée avec succès." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://pretnova.example/demande" />
          <meta property="og:locale" content={countryInfo.locale} />
        </Helmet>
        <div className="mx-auto grid max-w-4xl gap-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_30px_80px_-40px_rgba(14,42,114,0.5)] md:grid-cols-2">
          <img
            src={photos.signing}
            alt="Demande de prêt confirmée"
            className="h-full max-h-[420px] w-full object-cover"
          />
          <div className="p-8">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-mint-500/15 text-mint-600">
              <PartyPopper className="h-7 w-7" />
            </span>
            <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-nova-950">
              Demande envoyée, {form.firstName} !
            </h1>
            <p className="mt-4 leading-relaxed text-slate-600">
              Votre demande de <strong>{euro(form.amount, 0)}</strong> sur {form.months} mois est en cours
              d'analyse. Vous recevrez une réponse de principe à <strong>{form.email}</strong> sous 30 minutes
              ouvrées.
            </p>
            <div className="mt-6 rounded-2xl bg-nova-50 p-5">
              <p className="text-xs font-bold tracking-wider text-nova-700 uppercase">Référence dossier</p>
              <p className="mt-1 font-mono text-lg font-extrabold tracking-wider text-nova-800">
                {refNumber}
              </p>
              <p className="mt-3 text-sm text-slate-600">
                Mensualité étudiée : <strong>{euro(sim.monthly)}</strong> · TAEG {nf(sim.taeg, 1)} %
              </p>
            </div>
            <a
              href="index.html"
              className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-nova-600 px-7 py-3.5 font-bold text-white shadow-lg shadow-nova-600/25 transition hover:-translate-y-0.5 hover:bg-nova-700"
            >
              Retour à l'accueil
            </a>

            <div className="mt-6 border-t border-slate-100 pt-5">
              <p className="text-xs font-bold tracking-wider text-nova-700 uppercase">
                Envoyer à mon conseiller
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Transmettez votre dossier par WhatsApp ou Gmail avec vos pièces jointes.
              </p>
              <div className="mt-3 flex flex-wrap gap-2.5">
                <a
                  href={`https://wa.me/${countryInfo.phonePrefix.replace("+", "")}?text=${encodeURIComponent(
                    `Bonjour, je viens de soumettre une demande de prêt ${form.kind === "personnel" ? "personnel" : "professionnel"} de ${euro(form.amount, 0)} sur ${form.months} mois.\n\nRéf. dossier : NOVA-${refNumber}\nMensualité : ${euro(sim.monthly)}\nMTIC : ${euro(sim.mtic)}\nTAEG : ${nf(sim.taeg, 1)} %\n\nPièces jointes :\n- Carte d'identité (recto) : ${form.identityRecto?.name ?? "non fournie"}\n- Carte d'identité (verso) : ${form.identityVerso?.name ?? "non fournie"}\n- Justificatif de revenus : ${form.incomeFile?.name ?? "non fourni"}\n\nMerci de me recontacter à ${form.email} ou au ${form.phone}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/25 transition hover:-translate-y-0.5 hover:bg-emerald-700"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp
                </a>
                <a
                  href={`mailto:?subject=${encodeURIComponent(`Demande de prêt ${form.kind === "personnel" ? "personnel" : "professionnel"} - Nova`)}&body=${encodeURIComponent(
                    `Bonjour,\n\nJe vous transmets ma demande de prêt ${form.kind === "personnel" ? "personnel" : "professionnel"}.\n\nRéf. dossier : NOVA-${refNumber}\nMontant : ${euro(form.amount, 0)}\nDurée : ${form.months} mois\nMensualité : ${euro(sim.monthly)}\nTANN : ${nf(sim.tann, 3)} %\nTAEG : ${nf(sim.taeg, 1)} %\nMTIC : ${euro(sim.mtic)}\n\nCoordonnées :\n- Nom : ${form.civility} ${form.firstName} ${form.lastName}\n- Email : ${form.email}\n- Téléphone : ${form.phone}\n\nPièces jointes à ajouter :\n- Carte d'identité (recto) : ${form.identityRecto?.name ?? "non fournie"}\n- Carte d'identité (verso) : ${form.identityVerso?.name ?? "non fournie"}\n- Justificatif de revenus : ${form.incomeFile?.name ?? "non fourni"}\n\nMerci de me recontacter.\nCordialement`
                  )}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-rose-600/25 transition hover:-translate-y-0.5 hover:bg-rose-700"
                >
                  <Mail className="h-4 w-4" />
                  Gmail
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-slate-50 px-5 pt-28 pb-24 sm:px-8">
        <Helmet>
          <title>Demande de prêt · Prêt Nova</title>
          <meta name="description" content="Complétez votre demande de prêt personnel ou professionnel en 4 étapes." />
          <meta property="og:title" content="Demande de prêt · Prêt Nova" />
          <meta property="og:description" content="Formulaire de demande de prêt en ligne : 4 étapes guidées, sans engagement." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://pretnova.example/demande" />
          <meta property="og:locale" content={countryInfo.locale} />
        </Helmet>
      <div className="mx-auto w-full max-w-5xl">
        <a
          href="index.html"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-nova-700"
        >
          <ArrowLeft className="h-4 w-4" /> Retour à l'accueil
        </a>

        {/* Stepper */}
        <div className="mt-9 flex items-center">
          {st.map((t, i) => (
            <div key={t} className="flex flex-1 items-center last:flex-none">
              <button
                onClick={() => i < step && setStep(i)}
                className="flex items-center gap-2.5 text-left"
                disabled={i >= step}
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold transition ${
                    i < step
                      ? "bg-mint-500 text-white"
                      : i === step
                        ? "bg-nova-600 text-white ring-4 ring-nova-100"
                        : "bg-white text-slate-400 ring-1 ring-slate-200"
                  }`}
                >
                  {i < step ? <Check className="h-4.5 w-4.5" /> : i + 1}
                </span>
                <span
                  className={`hidden text-sm font-semibold sm:block ${
                    i <= step ? "text-nova-900" : "text-slate-400"
                  }`}
                >
                  {t}
                </span>
              </button>
              {i < stepTitles.length - 1 && (
                <span className={`mx-3 h-0.5 flex-1 rounded ${i < step ? "bg-mint-500" : "bg-slate-200"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.45fr_0.55fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
            {/* STEP 1 — loan */}
            {step === 0 && (
              <div className="space-y-8">
                <div>
                  <p className="text-sm font-bold text-nova-950">Type de financement</p>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    {(
                      [
                        ["personnel", "Prêt personnel", User],
                        ["professionnel", "Prêt professionnel", Briefcase],
                      ] as const
                    ).map(([k, label, Icon]) => (
                      <button
                        key={k}
                        onClick={() => {
                          set("kind", k);
                          set("purpose", (k === "personnel" ? personalPurposes : proPurposes)[0].label);
                        }}
                        className={`rounded-2xl border p-4 text-left transition ${
                          form.kind === k
                            ? "border-nova-600 bg-nova-50 ring-2 ring-nova-100"
                            : "border-slate-200 hover:border-nova-300"
                        }`}
                      >
                        <Icon className={`h-5 w-5 ${form.kind === k ? "text-nova-600" : "text-slate-400"}`} />
                        <p className="mt-2 text-sm font-extrabold text-nova-950">{label}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-bold text-nova-950">Objet du financement</p>
                  <div className="mt-3 flex flex-wrap gap-2.5">
                    {purposeList.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => set("purpose", p.label)}
                        className={`rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${
                          form.purpose === p.label
                            ? "border-nova-600 bg-nova-600 text-white"
                            : "border-slate-200 bg-white text-slate-600 hover:border-nova-300"
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex flex-wrap items-end justify-between gap-2">
                    <label className="text-sm font-bold text-nova-950">Montant souhaité</label>
                    <span className="text-2xl font-extrabold text-nova-700">{currency(form.amount, countryInfo.currency, 0)}</span>
                  </div>
                  <input
                    type="range"
                    min={1000}
                    max={75000}
                    step={500}
                    value={form.amount}
                    onChange={(e) => set("amount", Number(e.target.value))}
                    style={{
                      background: `linear-gradient(90deg, var(--color-nova-600) ${
                        ((form.amount - 1000) / 74000) * 100
                      }%, #e2e8f0 ${((form.amount - 1000) / 74000) * 100}%)`,
                    }}
                    className="mt-4 h-2 w-full rounded-full"
                  />
                </div>

                <div>
                  <div className="flex items-end justify-between gap-2">
                    <label className="text-sm font-bold text-nova-950">Durée de remboursement</label>
                    <span className="text-2xl font-extrabold text-nova-700">{form.months} mois</span>
                  </div>
                  <input
                    type="range"
                    min={18}
                    max={84}
                    step={6}
                    value={form.months}
                    onChange={(e) => set("months", Number(e.target.value))}
                    style={{
                      background: `linear-gradient(90deg, var(--color-nova-600) ${
                        ((form.months - 18) / 66) * 100
                      }%, #e2e8f0 ${((form.months - 18) / 66) * 100}%)`,
                    }}
                    className="mt-4 h-2 w-full rounded-full"
                  />
                </div>
              </div>
            )}

            {/* STEP 2 — identity */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <p className="mb-2 text-sm font-bold text-nova-950">Civilité</p>
                  <div className="flex gap-2.5">
                    {["Mme", "M.", "Autre"].map((c) => (
                      <button
                        key={c}
                        onClick={() => set("civility", c)}
                        className={`rounded-xl border px-5 py-2.5 text-sm font-bold transition ${
                          form.civility === c
                            ? "border-nova-600 bg-nova-600 text-white"
                            : "border-slate-200 text-slate-600 hover:border-nova-300"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-600">Prénom</label>
                    <input
                      value={form.firstName}
                      onChange={(e) => set("firstName", e.target.value)}
                      placeholder="Camille"
                      className={field("firstName")}
                    />
                    <Err k="firstName" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-600">Nom</label>
                    <input
                      value={form.lastName}
                      onChange={(e) => set("lastName", e.target.value)}
                      placeholder="Rousseau"
                      className={field("lastName")}
                    />
                    <Err k="lastName" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-600">
                      <Mail className="mr-1 inline h-3.5 w-3.5" /> Email
                    </label>
                    <input
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                      placeholder="camille@email.com"
                      className={field("email")}
                    />
                    <Err k="email" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-600">
                      <Phone className="mr-1 inline h-3.5 w-3.5" /> Téléphone mobile
                    </label>
                    <input
                      value={form.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      placeholder={countryInfo.phoneExample}
                      className={field("phone")}
                    />
                    <Err k="phone" />
                  </div>
                  <div>
                    <label htmlFor="birth" className="mb-1.5 block text-sm font-semibold text-slate-600">
                      Date de naissance
                    </label>
                    <input
                      id="birth"
                      type="date"
                      value={form.birth}
                      onChange={(e) => set("birth", e.target.value)}
                      className={field("birth")}
                    />
                    <Err k="birth" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-600">Pays de résidence</label>
                    <select
                      value={form.country}
                      onChange={(e) => set("country", e.target.value)}
                      className={field("country")}
                    >
                      {countryNames.map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="city" className="mb-1.5 block text-sm font-semibold text-slate-600">Ville</label>
                    <input
                      id="city"
                      value={form.city}
                      onChange={(e) => set("city", e.target.value)}
                      placeholder="Lyon"
                      className={field("city")}
                    />
                    <Err k="city" />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3 — situation */}
            {step === 2 && (
              <div className="space-y-7">
                <div>
                  <p className="mb-3 text-sm font-bold text-nova-950">Situation professionnelle</p>
                  <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                    {employmentOptions.map((o) => {
                      const active = form.employment === o.id;
                      return (
                        <button
                          key={o.id}
                          onClick={() => set("employment", o.id)}
                          className={`flex items-center gap-2 rounded-xl border px-3 py-3 text-xs font-bold transition ${
                            active
                              ? "border-nova-600 bg-nova-50 text-nova-800 ring-2 ring-nova-100"
                              : "border-slate-200 text-slate-600 hover:border-nova-300"
                          }`}
                        >
                          <o.icon className={`h-4 w-4 ${active ? "text-nova-600" : "text-slate-400"}`} />
                          {o.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-600">
                      Ancienneté dans l'emploi
                    </label>
                    <select
                      value={form.seniority}
                      onChange={(e) => set("seniority", e.target.value)}
                      className={field("seniority")}
                    >
                      {["Moins d'1 an", "1 à 3 ans", "3 à 5 ans", "Plus de 5 ans"].map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-600">
                      <Wallet className="mr-1 inline h-3.5 w-3.5" /> {t(lang, "income")} ({countryInfo.currency})
                    </label>
                    <input
                      type="number"
                      value={form.income}
                      onChange={(e) => set("income", e.target.value)}
                      placeholder={`2 400 ${countryInfo.currency}`}
                      className={field("income")}
                    />
                    <Err k="income" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-600">
                      Charges mensuelles (loyer, crédits)
                    </label>
                    <input
                      type="number"
                      value={form.charges}
                      onChange={(e) => set("charges", e.target.value)}
                      placeholder="850"
                      className={field("charges")}
                    />
                    <Err k="charges" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-600">
                      <Home className="mr-1 inline h-3.5 w-3.5" /> Situation de logement
                    </label>
                    <select
                      value={form.housing}
                      onChange={(e) => set("housing", e.target.value)}
                      className={field("housing")}
                    >
                      {housingOptions.map((h) => (
                        <option key={h}>{h}</option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-sm font-semibold text-slate-600">
                      IBAN de versement <span className="font-normal text-slate-400">(facultatif)</span>
                    </label>
                    <input
                      value={form.iban}
                      onChange={(e) => set("iban", e.target.value.toUpperCase())}
                      placeholder={`${countryInfo.code}76 3000 6000 0112 3456 7890 189`}
                      className={`${field("iban")} font-mono tracking-wider`}
                    />
                    <Err k="iban" />
                  </div>
                </div>

                {rateEffort !== null && (
                  <div
                    className={`rounded-2xl border p-5 ${
                      rateEffort > 40
                        ? "border-amber-300 bg-amber-50"
                        : "border-mint-500/30 bg-mint-500/10"
                    }`}
                  >
                    <p className="text-sm font-extrabold text-nova-950">
                      Taux d'endettement estimé : {rateEffort} %
                    </p>
                    <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white">
                      <div
                        className={`h-full rounded-full ${rateEffort > 40 ? "bg-amber-500" : "bg-mint-500"}`}
                        style={{ width: `${Math.min(rateEffort, 100)}%` }}
                      />
                    </div>
                    <p className="mt-2.5 text-xs text-slate-600">
                      {rateEffort > 40
                        ? "Au-delà de 40 %, un allongement de la durée ou un montant plus faible améliore vos chances d'acceptation."
                        : "Votre capacité de remboursement se situe dans les seuils habituellement acceptés."}
                    </p>
                  </div>
                )}

                {/* Documents upload */}
                <div className="border-t border-slate-100 pt-6">
                  <p className="text-sm font-bold text-nova-950">
                    <Image className="mr-1.5 inline h-4 w-4 text-nova-600" />
                    Pièces justificatives
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Formats acceptés : JPG, PNG, PDF. Vous pouvez prendre les photos directement depuis votre téléphone.
                  </p>
                  <div className="mt-4 grid gap-4 sm:grid-cols-3">
                    <FileUpload
                      label="Carte d'identité (recto)"
                      accept=".jpg,.jpeg,.png,.pdf"
                      fileName={form.identityRecto?.name ?? null}
                      onSelect={(f) => set("identityRecto", f)}
                    />
                    <FileUpload
                      label="Carte d'identité (verso)"
                      accept=".jpg,.jpeg,.png,.pdf"
                      fileName={form.identityVerso?.name ?? null}
                      onSelect={(f) => set("identityVerso", f)}
                    />
                    <FileUpload
                      label="Justificatif de revenus"
                      accept=".jpg,.jpeg,.png,.pdf"
                      fileName={form.incomeFile?.name ?? null}
                      onSelect={(f) => set("incomeFile", f)}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4 — summary */}
            {step === 3 && (
              <div>
                <h2 className="text-lg font-extrabold text-nova-950">Vérifiez votre demande</h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <dl className="divide-y divide-slate-100 rounded-2xl border border-slate-200">
                    {[
                      ["Type", form.kind === "personnel" ? "Prêt personnel" : "Prêt professionnel"],
                      ["Objet", form.purpose],
                      ["Montant", euro(form.amount, 0)],
                      ["Durée", `${form.months} mois`],
                      ["Mensualité", euro(sim.monthly)],
                      ["TANN / TAEG", `${nf(sim.tann, 3)} % · ${nf(sim.taeg, 1)} %`],
                      ["MTIC", euro(sim.mtic)],
                    ].map(([k, v]) => (
                      <div key={k} className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm">
                        <dt className="text-slate-500">{k}</dt>
                        <dd className="text-right font-bold text-nova-950">{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <dl className="divide-y divide-slate-100 rounded-2xl border border-slate-200">
                    {[
                      ["Demandeur", `${form.civility} ${form.firstName} ${form.lastName}`],
                      ["Email", form.email],
                      ["Téléphone", form.phone],
                      ["Résidence", `${form.city}, ${form.country}`],
                      ["Emploi", employmentOptions.find((e) => e.id === form.employment)?.label ?? "—"],
                      ["Revenu net", form.income ? `${nf(Number(form.income), 0)} €` : "—"],
                      ["Logement", form.housing],
                    ].map(([k, v]) => (
                      <div key={k} className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm">
                        <dt className="text-slate-500">{k}</dt>
                        <dd className="max-w-[55%] truncate text-right font-bold text-nova-950">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="mt-6 space-y-3">
                  <label className="flex cursor-pointer items-start gap-3 rounded-2xl bg-slate-50 p-4">
                    <input
                      type="checkbox"
                      checked={form.consent}
                      onChange={(e) => set("consent", e.target.checked)}
                      className="mt-0.5 h-5 w-5 accent-nova-600"
                    />
                    <span className="text-sm text-slate-600">
                      J'accepte la politique de confidentialité et autorise Prêt Nova ainsi que ses partenaires
                      bancaires agréés à étudier ma demande.
                    </span>
                  </label>
                  <Err k="consent" />
                  <label className="flex cursor-pointer items-start gap-3 rounded-2xl bg-slate-50 p-4">
                    <input
                      type="checkbox"
                      checked={form.marketing}
                      onChange={(e) => set("marketing", e.target.checked)}
                      className="mt-0.5 h-5 w-5 accent-nova-600"
                    />
                    <span className="text-sm text-slate-600">
                      Je souhaite recevoir le suivi de mon dossier et les offres promotionnelles par email.
                    </span>
                  </label>
                </div>
              </div>
            )}

            <div className="mt-9 flex items-center justify-between gap-4">
              <button
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-slate-600 transition enabled:hover:bg-slate-100 disabled:opacity-0"
              >
                <ArrowLeft className="h-4 w-4" /> Précédent
              </button>
              <button
                onClick={next}
                className="group inline-flex items-center gap-2 rounded-2xl bg-nova-600 px-7 py-3.5 font-bold text-white shadow-lg shadow-nova-600/25 transition hover:-translate-y-0.5 hover:bg-nova-700"
              >
                {step === 3 ? "Envoyer ma demande" : "Continuer"}
                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="h-fit space-y-4 lg:sticky lg:top-28">
            <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-nova-950 to-nova-800 text-white">
              <div className="flex items-center gap-2 bg-amber-400 px-4 py-2">
                <Sparkles className="h-3.5 w-3.5 text-amber-900" />
                <p className="text-[10px] font-extrabold tracking-wider text-amber-900 uppercase">
                  Tarif promo jusqu'au 12/05/2026
                </p>
              </div>
              <div className="p-6">
                <p className="text-[11px] font-bold tracking-widest text-nova-200 uppercase">Votre simulation</p>
                <p className="mt-2 text-3xl font-extrabold">{currency(form.amount, countryInfo.currency, 0)}</p>
                <p className="text-sm text-nova-200">
                  {form.months} mois · TANN {nf(sim.tann, 3)} %
                </p>
                <div className="mt-5 border-t border-white/15 pt-4">
                  <p className="text-sm text-nova-200">Mensualité</p>
                  <p className="text-2xl font-extrabold text-mint-400">{currency(sim.monthly, countryInfo.currency)}</p>
                </div>
                <div className="mt-4 flex justify-between border-t border-white/15 pt-4 text-sm">
                  <span className="text-nova-200">MTIC</span>
                  <span className="font-bold">{euro(sim.mtic)}</span>
                </div>
              </div>
            </div>

            <img
              src={photos.advisor}
              alt="Conseillère Prêt Nova"
              loading="lazy"
              className="hidden h-40 w-full rounded-3xl object-cover lg:block"
            />

            <div className="rounded-3xl border border-slate-200 bg-white p-6">
              <p className="flex items-center gap-2 text-sm font-bold text-nova-950">
                <Lock className="h-4 w-4 text-mint-500" /> Connexion chiffrée
              </p>
              <ul className="mt-4 space-y-2.5 text-sm text-slate-600">
                {[
                  [ShieldCheck, "Données chiffrées AES-256"],
                  [Landmark, "Partenaires agréés UE"],
                  [Clock3, "Réponse en 30 minutes"],
                  [CheckCircle2, "Sans engagement"],
                ].map(([Icon, t]) => {
                  const I = Icon as typeof ShieldCheck;
                  return (
                    <li key={t as string} className="flex items-center gap-2">
                      <I className="h-4 w-4 shrink-0 text-mint-500" /> {t as string}
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
