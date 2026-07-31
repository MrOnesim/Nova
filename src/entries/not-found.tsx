import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import Layout from "../components/Layout";
import NotFound from "../pages/NotFound";
import "../index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <Layout>
        <NotFound />
      </Layout>
    </HelmetProvider>
  </StrictMode>
);
