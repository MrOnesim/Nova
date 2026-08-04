import type { Lang } from "./locale";

/** Map ISO country code (from IP geolocation) to a supported site language. */
const countryLangMap: Record<string, Lang> = {
  FR: "fr",
  BE: "fr",
  LU: "fr",
  ES: "es",
  SV: "es",
  MX: "es",
  AR: "es",
  CO: "es",
  CL: "es",
  PE: "es",
  VE: "es",
  EC: "es",
  GT: "es",
  CU: "es",
  BO: "es",
  DO: "es",
  HN: "es",
  PY: "es",
  NI: "es",
  CR: "es",
  PA: "es",
  UY: "es",
  GQ: "es",
  IT: "it",
  DE: "de",
  AT: "de",
  CH: "de",
  PT: "pt",
  BR: "pt",
  NL: "nl",
  SK: "sk",
};

/** Default language when detection fails or country is unsupported (base = Spanish). */
const DEFAULT_LANG: Lang = "es";

/**
 * Detect the user's language automatically via their IP address using the
 * free ipwho.is geolocation API. Falls back to Spanish on any failure
 * (offline, blocked, rate-limited, unknown country).
 */
export async function detectLanguageByIp(): Promise<Lang> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 4000);
  try {
    const res = await fetch("https://ipwho.is/", { signal: controller.signal });
    if (!res.ok) return DEFAULT_LANG;
    const data = await res.json();
    const code = String(data?.country_code ?? "").toUpperCase();
    return countryLangMap[code] ?? DEFAULT_LANG;
  } catch {
    return DEFAULT_LANG;
  } finally {
    clearTimeout(timer);
  }
}