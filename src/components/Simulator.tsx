import { useMemo, useState } from "react";
import {
  ArrowRight,
  Banknote,
  BadgeEuro,
  Briefcase,
  Car,
  Clock3,
  Crown,
  GraduationCap,
  Hammer,
  HeartPulse,
  Info,
  Landmark,
  Layers,
  Mail,
  Package,
  Plane,
  ShieldCheck,
  Sparkles,
  Store,
  TrendingUp,
  User,
  Users,
  Wallet,
  Wrench,
} from "lucide-react";
import { personalPurposes, proPurposes } from "../data";
import { pt } from "../lib/content";
import { useLanguage } from "../lib/LanguageContext";

export type SimulationResult = {
  kind: "personnel" | "professionnel";
  profile: "particuliers" | "prestige";
  purpose: string;
  amount: number;
  months: number;
  monthly: number;
  tann: number;
  taeg: number;
  interest: number;
  stampInterest: number;
  stampOpening: number;
  fees: number;
  mtic: number;
};

const icons: Record<string, typeof Car> = {
  Hammer,
  Car,
  Layers,
  GraduationCap,
  Plane,
  HeartPulse,
  Wallet,
  Wrench,
  Store,
  Package,
  Users,
  TrendingUp,
};

const MIN = 1000;
const MAX = 75000;
const MIN_M = 18;
const MAX_M = 84;
const QUICK = [1000, 5000, 10000, 15000, 20000];

const nf = (n: number, d = 2) =>
  n.toLocaleString("fr-FR", { minimumFractionDigits: d, maximumFractionDigits: d });
const euro = (n: number, d = 2) => `${nf(n, d)} €`;

/** Nominal annual rate by product / profile, softened for large amounts. */
function baseRate(kind: SimulationResult["kind"], profile: SimulationResult["profile"], amount: number) {
  let r = kind === "personnel" ? (profile === "prestige" ? 8.9 : 10.7) : profile === "prestige" ? 7.9 : 9.5;
  if (amount >= 25000) r -= 0.5;
  if (amount >= 50000) r -= 0.4;
  return r;
}

export function computeSimulation(
  kind: SimulationResult["kind"],
  profile: SimulationResult["profile"],
  purpose: string,
  amount: number,
  months: number,
): SimulationResult {
  const tann = baseRate(kind, profile, amount);
  const taeg = tann + 3.6;
  const i = taeg / 100 / 12;
  const monthly = (amount * i) / (1 - Math.pow(1 + i, -months));
  const interest = monthly * months - amount;
  const stampInterest = interest * 0.04;
  const stampOpening = amount * 0.0004;
  const fees = kind === "personnel" ? 17.6 : 24.9;
  return {
    kind,
    profile,
    purpose,
    amount,
    months,
    monthly,
    tann,
    taeg,
    interest,
    stampInterest,
    stampOpening,
    fees,
    mtic: amount + interest + stampInterest + stampOpening + fees,
  };
}

function Slider({
  value,
  min,
  max,
  step,
  onChange,
}: {
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      style={{
        background: `linear-gradient(90deg, var(--color-nova-600) ${pct}%, #e2e8f0 ${pct}%)`,
      }}
      className="h-2 w-full cursor-pointer rounded-full"
    />
  );
}

export default function Simulator({
  onApply,
}: {
  onApply: (result: SimulationResult) => void;
}) {
  const { lang } = useLanguage();
  const [kind, setKind] = useState<SimulationResult["kind"]>("personnel");
  const [profile, setProfile] = useState<SimulationResult["profile"]>("particuliers");
  const [amount, setAmount] = useState(1000);
  const [months, setMonths] = useState(18);
  const [purpose, setPurpose] = useState(personalPurposes[0].id);
  const [email, setEmail] = useState("");
  const [savedHint, setSavedHint] = useState(false);

  const purposeList = kind === "personnel" ? personalPurposes : proPurposes;
  const activePurpose = purposeList.find((p) => p.id === purpose) ?? purposeList[0];

  const r = useMemo(
    () => computeSimulation(kind, profile, activePurpose.id, amount, months),
    [kind, profile, activePurpose.id, amount, months],
  );

  const switchKind = (k: SimulationResult["kind"]) => {
    setKind(k);
    setPurpose((k === "personnel" ? personalPurposes : proPurposes)[0].id);
  };

  return (
    <div id="simulateur" className="scroll-mt-24">
      {/* Product tabs + trust badges */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="inline-flex rounded-2xl bg-slate-100 p-1.5">
          {(
            [
              ["personnel", "sim.tabPersonal", User],
              ["professionnel", "sim.tabPro", Briefcase],
            ] as const
          ).map(([k, labelKey, Icon]) => (
            <button
              key={k}
              onClick={() => switchKind(k)}
              className={`flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition ${
                kind === k ? "bg-white text-nova-700 shadow-md" : "text-slate-500 hover:text-nova-700"
              }`}
            >
              <Icon className="h-4.5 w-4.5" /> {pt(lang, labelKey)}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2.5">
          {[
            [ShieldCheck, "home.badge1"],
            [Landmark, "home.badge2"],
            [Clock3, "home.badge3"],
          ].map(([Icon, labelKey]) => {
            const I = Icon as typeof ShieldCheck;
            return (
              <span
                key={labelKey as string}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-600"
              >
                <I className="h-3.5 w-3.5 text-mint-500" /> {pt(lang, labelKey as string)}
              </span>
            );
          })}
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        {/* LEFT — controls */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_24px_70px_-40px_rgba(14,42,114,0.5)] sm:p-8">
          <p className="text-sm font-bold text-nova-950">{pt(lang, "sim.objective")}</p>
          <div className="mt-3.5 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {purposeList.map((p) => {
              const Icon = icons[p.icon];
              const active = p.id === purpose;
              return (
                <button
                  key={p.id}
                  onClick={() => setPurpose(p.id)}
                  className={`flex items-center gap-2 rounded-xl border px-3 py-3 text-left text-xs font-bold transition ${
                    active
                      ? "border-nova-600 bg-nova-50 text-nova-800 ring-2 ring-nova-100"
                      : "border-slate-200 bg-white text-slate-600 hover:border-nova-300"
                  }`}
                >
                  <Icon className={`h-4.5 w-4.5 shrink-0 ${active ? "text-nova-600" : "text-slate-400"}`} />
                  <span className="leading-tight">{pt(lang, p.labelKey)}</span>
                </button>
              );
            })}
          </div>

          {/* Amount */}
          <div className="mt-8">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <label className="text-sm font-bold text-nova-950">{pt(lang, "sim.amountLabel")}</label>
              <span className="text-3xl font-extrabold tracking-tight text-nova-700">{euro(amount, 0)}</span>
            </div>
            <p className="mt-1 text-xs text-slate-500">{pt(lang, "sim.amountRange")}</p>
            <div className="mt-4">
              <Slider value={amount} min={MIN} max={MAX} step={500} onChange={setAmount} />
              <div className="mt-2 flex justify-between text-xs font-semibold text-slate-400">
                <span>1 000 €</span>
                <span>75 000 €</span>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {QUICK.map((q) => (
                <button
                  key={q}
                  onClick={() => setAmount(q)}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-bold transition ${
                    amount === q
                      ? "border-nova-600 bg-nova-600 text-white"
                      : "border-slate-200 bg-white text-slate-600 hover:border-nova-300"
                  }`}
                >
                  {nf(q, 0)} €
                </button>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div className="mt-8">
            <div className="flex items-end justify-between gap-2">
              <label className="text-sm font-bold text-nova-950">{pt(lang, "sim.durationLabel")}</label>
              <span className="text-3xl font-extrabold tracking-tight text-nova-700">
                {months} {pt(lang, "sim.monthsUnit")}
              </span>
            </div>
            <div className="mt-4">
              <Slider value={months} min={MIN_M} max={MAX_M} step={6} onChange={setMonths} />
              <div className="mt-2 flex justify-between text-xs font-semibold text-slate-400">
                <span>18 {pt(lang, "sim.monthsUnit")}</span>
                <span>84 {pt(lang, "sim.monthsUnit")}</span>
              </div>
            </div>
          </div>

          {/* Profile */}
          <div className="mt-8">
            <label className="text-sm font-bold text-nova-950">{pt(lang, "sim.profileLabel")}</label>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {(
                [
                  ["particuliers", "sim.profileParticuliers", "sim.profileParticuliersHint", User],
                  ["prestige", "sim.profilePrestige", "sim.profilePrestigeHint", Crown],
                ] as const
              ).map(([p, labelKey, hintKey, Icon]) => {
                const active = profile === p;
                return (
                  <button
                    key={p}
                    onClick={() => setProfile(p)}
                    className={`rounded-2xl border p-4 text-left transition ${
                      active
                        ? "border-nova-600 bg-nova-50 ring-2 ring-nova-100"
                        : "border-slate-200 bg-white hover:border-nova-300"
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${active ? "text-nova-600" : "text-slate-400"}`} />
                    <p className={`mt-2 text-sm font-extrabold ${active ? "text-nova-800" : "text-slate-700"}`}>
                      {pt(lang, labelKey)}
                    </p>
                    <p className="text-xs text-slate-500">{pt(lang, hintKey)}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Fixed-rate notice */}
          <div className="mt-8 flex gap-3.5 rounded-2xl border border-mint-500/30 bg-mint-500/8 p-5">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-mint-600" />
            <div>
              <p className="text-sm font-extrabold text-nova-950">
                {pt(lang, "sim.fixedTitle")}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">
                {pt(lang, "sim.fixedText")}
              </p>
            </div>
          </div>

          <button
            onClick={() => onApply(r)}
            className="group mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-nova-600 px-6 py-4 text-base font-extrabold text-white shadow-xl shadow-nova-600/25 transition hover:-translate-y-0.5 hover:bg-nova-700"
          >
            {pt(lang, "sim.applyButton")}
            <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
          </button>
        </div>

        {/* RIGHT — résultat */}
        <div className="flex flex-col gap-4">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_24px_70px_-40px_rgba(14,42,114,0.5)]">
            <div className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-300 px-5 py-2.5">
              <Sparkles className="h-3.5 w-3.5 text-amber-900" />
              <p className="text-[11px] font-extrabold tracking-wider text-amber-900 uppercase">
                {pt(lang, "sim.promo")}
              </p>
            </div>

            <div className="bg-gradient-to-br from-nova-950 to-nova-800 px-6 py-7 text-white">
              <p className="text-[11px] font-bold tracking-widest text-nova-200 uppercase">{pt(lang, "sim.paymentLabel")}</p>
              <div className="mt-2 flex items-end gap-3">
                <span className="rounded-xl bg-white/10 px-3 py-1.5 text-lg font-extrabold text-mint-400">
                  {months}x
                </span>
                <span className="text-4xl leading-none font-extrabold tracking-tight">{euro(r.monthly)}</span>
                <span className="pb-1 text-sm text-nova-200">{pt(lang, "sim.perMonth")}</span>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3 border-t border-white/15 pt-5 text-center">
                <div>
                  <p className="text-[11px] font-bold tracking-wider text-nova-200 uppercase">TANN</p>
                  <p className="mt-1 font-extrabold">{nf(r.tann, 3)} %</p>
                </div>
                <div className="border-x border-white/15">
                  <p className="text-[11px] font-bold tracking-wider text-nova-200 uppercase">TAEG</p>
                  <p className="mt-1 font-extrabold">{nf(r.taeg, 1)} %</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold tracking-wider text-nova-200 uppercase">{pt(lang, "sim.feeType")}</p>
                  <p className="mt-1 font-extrabold">{pt(lang, "sim.feeFixed")}</p>
                </div>
              </div>
            </div>

            <div className="px-6 py-6">
              <p className="text-[11px] font-extrabold tracking-widest text-slate-400 uppercase">
                {pt(lang, "sim.totalLabel")}
              </p>
              <div className="mt-4 flex items-center justify-between rounded-2xl bg-nova-50 px-4 py-3.5">
                <span className="flex items-center gap-2 text-sm font-extrabold text-nova-900">
                  <BadgeEuro className="h-4.5 w-4.5 text-nova-600" /> MTIC
                </span>
                <span className="text-xl font-extrabold text-nova-800">{euro(r.mtic)}</span>
              </div>

              <dl className="mt-4 divide-y divide-slate-100 text-sm">
                {[
                  ["sim.lineAmount", r.amount],
                  ["sim.lineInterest", r.interest],
                  ["sim.lineStampInterest", r.stampInterest],
                  ["sim.lineStampOpening", r.stampOpening],
                  ["sim.lineFees", r.fees],
                ].map(([labelKey, value]) => (
                  <div key={labelKey as string} className="flex items-center justify-between gap-4 py-2.5">
                    <dt className="text-slate-500">{pt(lang, labelKey as string)}</dt>
                    <dd className="font-bold text-nova-950">{euro(value as number)}</dd>
                  </div>
                ))}
              </dl>

              <p className="mt-4 flex items-start gap-2 text-[11px] leading-relaxed text-slate-400">
                <Banknote className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                {pt(lang, "sim.disclaimer")}
              </p>
            </div>
          </div>

          {/* Save by email */}
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p className="flex items-center gap-2 text-sm font-extrabold text-nova-950">
              <Mail className="h-4.5 w-4.5 text-nova-600" /> {pt(lang, "sim.saveTitle")}
              <span className="ml-auto rounded-full bg-slate-200 px-2.5 py-1 text-[10px] font-extrabold tracking-wide text-slate-500 uppercase">
                {pt(lang, "sim.comingSoon")}
              </span>
            </p>
            <div className="mt-3.5 flex flex-col gap-2.5 sm:flex-row">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vous@email.com"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-nova-400 focus:ring-4 focus:ring-nova-100"
              />
              <button
                onClick={() => setSavedHint(true)}
                className="shrink-0 cursor-not-allowed rounded-xl bg-slate-300 px-5 py-3 text-sm font-bold text-white"
              >
                {pt(lang, "sim.send")}
              </button>
            </div>
            <p className="mt-2.5 text-xs text-slate-500">
              {savedHint ? pt(lang, "sim.saveHintDone") : pt(lang, "sim.saveHint")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
