export const photos = {
  heroWoman: "/images/hero-woman.jpg",
  coupleLaptop: "/images/couple-laptop.jpg",
  advisor: "/images/advisor.jpg",
  entrepreneur: "/images/entrepreneur.jpg",
  cafeOwner: "/images/jinyun-xBuu23uxarU-unsplash.jpg",
  kitchen: "/images/kitchen.jpg",
  works: "/images/jakub-zerdzicki-UlDvTJ4zc-g-unsplash.jpg",
  car: "/images/car.jpg",
  desk: "/images/jakub-zerdzicki-jaHmB2Z996I-unsplash.jpg",
  familyHome: "/images/family-home.jpg",
  signing: "/images/signature-contrat.jpg",
  manPhone: "/images/jakub-zerdzicki-riZ3ngJV6JA-unsplash.jpg",
  heroBg: "/images/hero-bg.jpg",
  moneyHand: "/images/money-hand.jpg",
  euroCoins: "/images/euro-coins.jpg",
  euroKeys: "/images/euro-and-keys.jpg",
  euroInHand: "/images/euro-in%20hand.jpg",
};

export const avatars = {
  camille: { initials: "CR", color: "bg-nova-600" },
  yanis: { initials: "YB", color: "bg-mint-600" },
  sofia: { initials: "SM", color: "bg-nova-800" },
  thomas: { initials: "TM", color: "bg-nova-400" },
};

export type Feature = { icon: string; title: string; text: string };

export const features: Feature[] = [
  {
    icon: "Zap",
    title: "Réponse en 30 minutes",
    text: "Notre moteur de décision analyse votre dossier en temps réel. Accord de principe immédiat, déblocage sous 24 h.",
  },
  {
    icon: "ShieldCheck",
    title: "Sécurité bancaire",
    text: "Chiffrement AES-256, authentification forte et hébergement européen. Vos données ne sont jamais revendues.",
  },
  {
    icon: "Landmark",
    title: "Réglementé dans l'UE",
    text: "Intermédiaire en financement participatif enregistré, conforme à la directive européenne sur le crédit aux consommateurs.",
  },
  {
    icon: "LockKeyhole",
    title: "Taux fixe garanti",
    text: "Le TANN et la mensualité ne bougent pas pendant toute la durée du prêt. Aucun frais caché, aucune surprise.",
  },
  {
    icon: "UserCheck",
    title: "Sans caution ni garant",
    text: "Nous évaluons votre capacité de remboursement réelle. Pas de caution solidaire, pas de bien mis en garantie.",
  },
  {
    icon: "Headphones",
    title: "Un conseiller dédié",
    text: "Une équipe humaine joignable du lundi au samedi, par téléphone, chat ou visioconférence.",
  },
];

export const steps = [
  {
    title: "Simulez en 30 secondes",
    text: "Choisissez le montant, la durée et votre profil. La mensualité et le coût total s'affichent instantanément.",
  },
  {
    title: "Complétez la demande",
    text: "Un formulaire guidé en 4 étapes, entièrement en ligne, avec sauvegarde automatique de votre progression.",
  },
  {
    title: "Recevez l'accord",
    text: "Analyse automatisée puis validation par un conseiller. Réponse de principe en 30 minutes ouvrées.",
  },
  {
    title: "Signez et recevez les fonds",
    text: "Signature électronique certifiée eIDAS, puis virement SEPA sur votre compte sous 24 à 48 heures.",
  },
];

export const stats = [
  { value: 75000, suffix: " €", label: "Montant maximum finançable" },
  { value: 30, suffix: " min", label: "Délai moyen de réponse" },
  { value: 42800, suffix: "+", label: "Dossiers financés en zone Euro" },
  { value: 94, suffix: " %", label: "Taux d'acceptation" },
];

export const testimonials = [
  {
    quote:
      "J'ai simulé mon prêt un dimanche soir et signé le mardi. La mensualité annoncée par le simulateur était exactement celle du contrat.",
    name: "Camille Rousseau",
    city: "Lyon · Prêt travaux 18 000 €",
    initials: avatars.camille.initials,
    color: avatars.camille.color,
  },
  {
    quote:
      "Le détail du coût total, timbres compris, m'a permis de comparer sérieusement avec ma banque. Personne d'autre ne me l'avait montré aussi clairement.",
    name: "Yanis Berthier",
    city: "Bruxelles · Regroupement 27 500 €",
    initials: avatars.yanis.initials,
    color: avatars.yanis.color,
  },
  {
    quote:
      "En tant qu'indépendante, j'avais peur du parcours. Une conseillère m'a rappelée en vingt minutes et le dossier était bouclé le lendemain.",
    name: "Sofia Marchetti",
    city: "Milan · Prêt professionnel 40 000 €",
    initials: avatars.sofia.initials,
    color: avatars.sofia.color,
  },
];

export const faqs = [
  {
    q: "Comment obtenir une réponse en 30 minutes ?",
    a: "Notre moteur d'analyse vérifie automatiquement les informations transmises et interroge nos partenaires bancaires. Pendant les heures ouvrées, un conseiller valide ensuite le dossier, ce qui donne un accord de principe en une trentaine de minutes.",
  },
  {
    q: "Le taux affiché dans le simulateur est-il définitif ?",
    a: "Le TANN et la mensualité affichés correspondent au barème promotionnel en vigueur pour le profil sélectionné. Ils sont confirmés après étude du dossier, puis restent fixes pendant toute la durée du prêt.",
  },
  {
    q: "Que comprend exactement le MTIC ?",
    a: "Le montant total imputé au consommateur additionne le capital emprunté, les intérêts, les droits de timbre sur les intérêts et à l'ouverture, ainsi que les frais de dossier. C'est la somme réellement remboursée au terme du contrat.",
  },
  {
    q: "Quels justificatifs dois-je fournir ?",
    a: "Une pièce d'identité en cours de validité, un justificatif de revenus récent et un RIB au format IBAN. Les indépendants ajoutent leur dernier avis d'imposition ou bilan.",
  },
  {
    q: "Puis-je rembourser par anticipation ?",
    a: "Oui, à tout moment, en totalité ou partiellement. L'indemnité éventuelle est plafonnée par la réglementation européenne et vous est communiquée avant la signature.",
  },
  {
    q: "Et si une mensualité pose problème ?",
    a: "Contactez votre conseiller avant l'échéance. Report d'une mensualité, modulation ou allongement de la durée : plusieurs aménagements existent pour éviter tout incident.",
  },
];

export const personalPurposes = [
  { id: "travaux", label: "Travaux & rénovation", icon: "Hammer" },
  { id: "auto", label: "Voiture / moto", icon: "Car" },
  { id: "regroupement", label: "Regroupement de crédits", icon: "Layers" },
  { id: "etudes", label: "Études & formation", icon: "GraduationCap" },
  { id: "voyage", label: "Voyage & loisirs", icon: "Plane" },
  { id: "sante", label: "Santé & imprévus", icon: "HeartPulse" },
];

export const proPurposes = [
  { id: "tresorerie", label: "Trésorerie", icon: "Wallet" },
  { id: "equipement", label: "Équipement & matériel", icon: "Wrench" },
  { id: "local", label: "Local commercial", icon: "Store" },
  { id: "stock", label: "Achat de stock", icon: "Package" },
  { id: "recrutement", label: "Recrutement", icon: "Users" },
  { id: "croissance", label: "Développement", icon: "TrendingUp" },
];

export const projects = [
  { title: "Travaux & rénovation", amount: "dès 3 000 €", photo: photos.kitchen },
  { title: "Achat d'un véhicule", amount: "dès 5 000 €", photo: photos.car },
  { title: "Lancer son activité", amount: "dès 10 000 €", photo: photos.entrepreneur },
  { title: "Regrouper ses crédits", amount: "jusqu'à 75 000 €", photo: photos.works },
];
