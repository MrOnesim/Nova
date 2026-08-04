export const photos = {
  heroWoman: "images/hero-woman.jpg",
  coupleLaptop: "images/couple-laptop.jpg",
  advisor: "images/advisor.jpg",
  entrepreneur: "images/entrepreneur.jpg",
  cafeOwner: "images/jinyun-xBuu23uxarU-unsplash.jpg",
  kitchen: "images/kitchen.jpg",
  works: "images/jakub-zerdzicki-UlDvTJ4zc-g-unsplash.jpg",
  car: "images/car.jpg",
  desk: "images/jakub-zerdzicki-jaHmB2Z996I-unsplash.jpg",
  familyHome: "images/family-home.jpg",
  signing: "images/signature-contrat.jpg",
  manPhone: "images/jakub-zerdzicki-riZ3ngJV6JA-unsplash.jpg",
  heroBg: "images/hero-bg.jpg",
  moneyHand: "images/money-hand.jpg",
  euroCoins: "images/euro-coins.jpg",
  euroKeys: "images/euro-and-keys.jpg",
  euroInHand: "images/euro-in%20hand.jpg",
};

export const avatars = {
  camille: { initials: "CR", color: "bg-nova-600" },
  yanis: { initials: "YB", color: "bg-mint-600" },
  sofia: { initials: "SM", color: "bg-nova-800" },
  thomas: { initials: "TM", color: "bg-nova-400" },
};

export type Feature = { icon: string; titleKey: string; textKey: string };

export const features: Feature[] = [
  { icon: "Zap", titleKey: "f1.title", textKey: "f1.text" },
  { icon: "ShieldCheck", titleKey: "f2.title", textKey: "f2.text" },
  { icon: "Landmark", titleKey: "f3.title", textKey: "f3.text" },
  { icon: "LockKeyhole", titleKey: "f4.title", textKey: "f4.text" },
  { icon: "UserCheck", titleKey: "f5.title", textKey: "f5.text" },
  { icon: "Headphones", titleKey: "f6.title", textKey: "f6.text" },
];

export const steps = [
  { titleKey: "s1.title", textKey: "s1.text" },
  { titleKey: "s2.title", textKey: "s2.text" },
  { titleKey: "s3.title", textKey: "s3.text" },
  { titleKey: "s4.title", textKey: "s4.text" },
];

export const stats = [
  { value: 75000, suffix: " €", labelKey: "stat1" },
  { value: 30, suffix: " min", labelKey: "stat2" },
  { value: 42800, suffix: "+", labelKey: "stat3" },
  { value: 94, suffix: " %", labelKey: "stat4" },
];

export const testimonials = [
  {
    quoteKey: "t1.quote",
    name: "Camille Rousseau",
    cityKey: "t1.city",
    initials: avatars.camille.initials,
    color: avatars.camille.color,
  },
  {
    quoteKey: "t2.quote",
    name: "Yanis Berthier",
    cityKey: "t2.city",
    initials: avatars.yanis.initials,
    color: avatars.yanis.color,
  },
  {
    quoteKey: "t3.quote",
    name: "Sofia Marchetti",
    cityKey: "t3.city",
    initials: avatars.sofia.initials,
    color: avatars.sofia.color,
  },
];

export const faqs = [
  { qKey: "q1", aKey: "a1" },
  { qKey: "q2", aKey: "a2" },
  { qKey: "q3", aKey: "a3" },
  { qKey: "q4", aKey: "a4" },
  { qKey: "q5", aKey: "a5" },
  { qKey: "q6", aKey: "a6" },
];

export const personalPurposes = [
  { id: "travaux", labelKey: "pp.travaux", icon: "Hammer" },
  { id: "auto", labelKey: "pp.auto", icon: "Car" },
  { id: "regroupement", labelKey: "pp.regroupement", icon: "Layers" },
  { id: "etudes", labelKey: "pp.etudes", icon: "GraduationCap" },
  { id: "voyage", labelKey: "pp.voyage", icon: "Plane" },
  { id: "sante", labelKey: "pp.sante", icon: "HeartPulse" },
];

export const proPurposes = [
  { id: "tresorerie", labelKey: "pp.tresorerie", icon: "Wallet" },
  { id: "equipement", labelKey: "pp.equipement", icon: "Wrench" },
  { id: "local", labelKey: "pp.local", icon: "Store" },
  { id: "stock", labelKey: "pp.stock", icon: "Package" },
  { id: "recrutement", labelKey: "pp.recrutement", icon: "Users" },
  { id: "croissance", labelKey: "pp.croissance", icon: "TrendingUp" },
];

export const projects = [
  { titleKey: "pr.travaux", amountKey: "pr.travauxAmt", photo: photos.kitchen },
  { titleKey: "pr.auto", amountKey: "pr.autoAmt", photo: photos.car },
  { titleKey: "pr.activite", amountKey: "pr.activiteAmt", photo: photos.entrepreneur },
  { titleKey: "pr.regroupement", amountKey: "pr.regroupementAmt", photo: photos.works },
];
