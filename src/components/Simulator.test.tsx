import { describe, it, expect } from "vitest";
import { computeSimulation } from "./Simulator";

describe("computeSimulation", () => {
  it("calcule correctement un prêt personnel standard", () => {
    const r = computeSimulation("personnel", "particuliers", "Travaux & rénovation", 10000, 36);
    expect(r.kind).toBe("personnel");
    expect(r.amount).toBe(10000);
    expect(r.months).toBe(36);
    expect(r.monthly).toBeGreaterThan(0);
    expect(r.mtic).toBeGreaterThan(r.amount);
    expect(r.tann).toBeCloseTo(10.7, 1);
    expect(r.taeg).toBeCloseTo(14.3, 1);
  });

  it("applique la remise pour les montants >= 25000", () => {
    const r = computeSimulation("personnel", "particuliers", "Auto", 25000, 48);
    expect(r.tann).toBeCloseTo(10.2, 1);
  });

  it("applique la remise pour les montants >= 50000", () => {
    const r = computeSimulation("personnel", "particuliers", "Auto", 50000, 60);
    expect(r.tann).toBeCloseTo(9.8, 1);
  });

  it("applique le taux prestige", () => {
    const r = computeSimulation("personnel", "prestige", "Voyage", 15000, 36);
    expect(r.tann).toBeCloseTo(8.9, 1);
  });

  it("calcule un prêt professionnel avec taux majoré", () => {
    const r = computeSimulation("professionnel", "particuliers", "Trésorerie", 20000, 48);
    expect(r.tann).toBeCloseTo(9.5, 1);
    expect(r.fees).toBe(24.9);
  });

  it("calcule le MTIC correctement", () => {
    const r = computeSimulation("personnel", "particuliers", "Travaux", 1000, 18);
    const expected = r.amount + r.interest + r.stampInterest + r.stampOpening + r.fees;
    expect(r.mtic).toBeCloseTo(expected, 2);
  });

  it("gère le cas extrême (montant max, durée max)", () => {
    const r = computeSimulation("personnel", "prestige", "Projet", 75000, 84);
    expect(r.monthly).toBeGreaterThan(0);
    expect(r.mtic).toBeGreaterThan(r.amount);
    expect(r.tann).toBeLessThanOrEqual(8.5);
  });
});
