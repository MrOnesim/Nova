export function validateEmail(v: string): string | null {
  if (v.trim().length < 2) return "Indiquez votre email";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return "Adresse email invalide";
  if (/\.{2,}|@.*@/.test(v)) return "Adresse email invalide";
  const [, domain] = v.split("@");
  if (!domain || !domain.includes(".")) return "Adresse email invalide";
  const tld = domain.split(".").pop() ?? "";
  if (tld.length < 2) return "Adresse email invalide";
  return null;
}

export function validatePhone(v: string): string | null {
  if (!v.trim()) return "Indiquez votre numéro de téléphone";
  const digits = v.replace(/\D/g, "");
  if (digits.length < 9 || digits.length > 12) return "Numéro de téléphone invalide (9-12 chiffres)";
  return null;
}

export function validateIBAN(v: string): string | null {
  if (!v.trim()) return null;
  const clean = v.replace(/\s/g, "").toUpperCase();
  if (clean.length < 15 || clean.length > 34) return "IBAN : 15 à 34 caractères";
  if (!/^[A-Z]{2}\d/.test(clean)) return "IBAN doit commencer par 2 lettres puis des chiffres";
  // IBAN checksum: move first 4 chars to end, convert letters to numbers, mod 97
  const rearranged = clean.slice(4) + clean.slice(0, 4);
  const numeric = rearranged
    .split("")
    .map((c) => (/[A-Z]/.test(c) ? (c.charCodeAt(0) - 55).toString() : c))
    .join("");
  if (numeric.length > 100) {
    // BigInt mod 97
    let rem = 0;
    for (let i = 0; i < numeric.length; i++) {
      rem = (rem * 10 + Number(numeric[i])) % 97;
    }
    if (rem !== 1) return "IBAN invalide (clé de contrôle erronée)";
  }
  return null;
}

export function validateSIRET(v: string): string | null {
  if (!v.trim()) return null;
  const clean = v.replace(/\s/g, "");
  if (!/^\d{14}$/.test(clean)) return "Le SIRET doit contenir exactement 14 chiffres";
  // Luhn algorithm
  let sum = 0;
  for (let i = 0; i < clean.length; i++) {
    let d = Number(clean[i]);
    if (i % 2 === 0) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
  }
  if (sum % 10 !== 0) return "SIRET invalide (clé de Luhn erronée)";
  return null;
}
