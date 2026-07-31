import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import Layout from "../components/Layout";
import MentionsLegales from "../pages/MentionsLegales";
import "../index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <Layout>
        <MentionsLegales />
      </Layout>
    </HelmetProvider>
  </StrictMode>
);
