import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import Layout from "../components/Layout";
import PolitiqueConfidentialite from "../pages/PolitiqueConfidentialite";
import "../index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <Layout>
        <PolitiqueConfidentialite />
      </Layout>
    </HelmetProvider>
  </StrictMode>
);
