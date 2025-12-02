export const RANKING_PROFILES = {
  geral: {
    name: "Geral",
    weights: {
      price: -0.30,
      consumption: -0.25,
      safety: 0.20,
      performance: 0.10,
      autonomy: 0.06,
      maintenance: 0.04,
      comfort: 0.03,
      infotainment: 0.02,
      dimensions: 0.02,
      boot: 0.02
    }
  },
  familia: {
    name: "Família",
    weights: {
      boot: 0.30,
      dimensions: 0.20,
      safety: 0.20,
      comfort: 0.15,
      autonomy: 0.10,
      price: -0.05
    }
  },
  luxo: {
    name: "Luxo",
    weights: {
      comfort: 0.30,
      infotainment: 0.20,
      performance: 0.15,
      safety: 0.15,
      price: -0.10,
      maintenance: 0.10
    }
  },
  economico: {
    name: "Econômico",
    weights: {
      consumption: -0.50,
      price: -0.30,
      maintenance: 0.10,
      safety: 0.05,
      comfort: 0.05
    }
  },
  urbano: {
    name: "Urbano",
    weights: {
      price: -0.25,
      consumption: -0.25,
      dimensions: 0.20, // smaller is better
      safety: 0.15,
      comfort: 0.10,
      boot: 0.05
    }
  },
  trabalho: {
    name: "Trabalho/Profissional",
    weights: {
      dimensions: 0.25,
      consumption: -0.25,
      boot: 0.25,
      performance: 0.15,
      maintenance: 0.15,
      safety: 0.10,
      price: -0.10
    }
  }
};

export const REFERENCE_VALUES = {
  price: { min: 20000, max: 400000 },
  consumptionKmL: { min: 3, max: 25 },
  potenciaCv: { min: 50, max: 450 },
  torqueKgfm: { min: 6, max: 60 },
  autonomiaKm: { min: 200, max: 1200 },
  velocidadeMaxima: { min: 120, max: 330 },
  aceleracao0100: { min: 2.5, max: 18 },
  bootLitros: { min: 100, max: 1200 },
  segurosIPVA: { min: 500, max: 15000 },
  notaLeitor: { min: 0, max: 10 },
  dimensionsMetric: { min: 1500, max: 3500 } // (wheelbase * 0.6 + width * 0.4)
};
