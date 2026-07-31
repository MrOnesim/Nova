import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import Layout from "../components/Layout";
import InfoPrecontractuelle from "../pages/InfoPrecontractuelle";
import "../index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <Layout>
        <InfoPrecontractuelle />
      </Layout>
    </HelmetProvider>
  </StrictMode>
);
