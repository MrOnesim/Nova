import { Helmet } from "react-helmet-async";
import { ArrowLeft, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-10rem)] items-center justify-center px-5 pt-28 pb-20 sm:px-8">
      <Helmet>
        <title>Page introuvable · Prêt Nova</title>
        <meta name="description" content="La page que vous recherchez n'existe pas." />
        <meta property="og:title" content="Page introuvable · Prêt Nova" />
        <meta property="og:description" content="La page que vous recherchez n'existe pas." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pretnova.example" />
        <meta property="og:locale" content="fr_FR" />
      </Helmet>
      <div className="mx-auto max-w-md text-center">
        <span className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-nova-50">
          <SearchX className="h-10 w-10 text-nova-600" />
        </span>
        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-nova-950">404</h1>
        <p className="mt-2 text-xl font-bold text-nova-800">Page introuvable</p>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          La page que vous cherchez n'existe pas ou a été déplacée. Vérifiez l'URL ou retournez à l'accueil.
        </p>
        <a
          href="index.html"
          className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-nova-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-nova-600/25 transition hover:-translate-y-0.5 hover:bg-nova-700"
        >
          <ArrowLeft className="h-4 w-4" /> Retour à l'accueil
        </a>
      </div>
    </main>
  );
}
