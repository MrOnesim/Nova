import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HelmetProvider } from "react-helmet-async";
import Apply from "./Apply";
import { LanguageProvider } from "../lib/LanguageContext";

function renderApply() {
  return render(
    <LanguageProvider>
      <HelmetProvider>
        <Apply />
      </HelmetProvider>
    </LanguageProvider>,
  );
}

describe("Apply page", () => {
  it("affiche le stepper avec 4 étapes", () => {
    renderApply();
    expect(screen.getByText("Votre prêt")).toBeInTheDocument();
    expect(screen.getByText("Votre identité")).toBeInTheDocument();
    expect(screen.getByText("Votre situation")).toBeInTheDocument();
    expect(screen.getByText("Récapitulatif")).toBeInTheDocument();
  });

  it("affiche le bouton Continuer au départ", () => {
    renderApply();
    expect(screen.getByText("Continuer")).toBeInTheDocument();
  });

  it("affiche les options de type de prêt", () => {
    renderApply();
    expect(screen.getByText("Prêt personnel")).toBeInTheDocument();
    expect(screen.getByText("Prêt professionnel")).toBeInTheDocument();
  });

  it("passe à l'étape suivante et affiche les champs identité", async () => {
    const user = userEvent.setup();
    renderApply();

    await user.click(screen.getByText("Continuer"));

    expect(screen.getByText("Prénom")).toBeInTheDocument();
    expect(screen.getByText("Nom")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  it("affiche les erreurs de validation sur l'étape identité", async () => {
    const user = userEvent.setup();
    renderApply();

    await user.click(screen.getByText("Continuer"));
    await user.click(screen.getByText("Continuer"));

    expect(screen.getByText("Indiquez votre prénom")).toBeInTheDocument();
    expect(screen.getByText("Indiquez votre nom")).toBeInTheDocument();
    expect(screen.getByText("Indiquez votre email")).toBeInTheDocument();
  });

  it("affiche le récapitulatif à l'étape 4", async () => {
    const user = userEvent.setup();
    renderApply();

    await user.click(screen.getByText("Continuer"));

    await user.type(screen.getByPlaceholderText("Camille"), "Jean");
    await user.type(screen.getByPlaceholderText("Rousseau"), "Dupont");
    await user.type(screen.getByPlaceholderText("camille@email.com"), "jean@test.com");
    await user.type(screen.getByPlaceholderText("06 12 34 56 78"), "0612345678");
    await user.type(screen.getByPlaceholderText("Lyon"), "Paris");
    await user.type(screen.getByLabelText("Date de naissance"), "1990-05-15");

    await user.click(screen.getByText("Continuer"));
    await user.type(screen.getByPlaceholderText("2 400 €"), "3000");

    await user.click(screen.getByText("Continuer"));

    expect(screen.getByText("Vérifiez votre demande")).toBeInTheDocument();
    expect(screen.getByText("Envoyer ma demande")).toBeInTheDocument();
  });
});
