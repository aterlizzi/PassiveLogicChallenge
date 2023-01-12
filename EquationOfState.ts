import { FluidProperties } from "./types/FluidType";

class EquationOfState {
  // Fluid properties
  private fluidProps: FluidProperties;

  // Equation of State Parameters, SVAS-8th Edition, Table 3.1
  private omega: number;
  private psi: number;
  private sigma: number;
  private epsilon: number;
  private alpha: number;

  //  Reference ideal gas enthalpy and entropy at 300K and 1 bar, (Arbitrary, these values chosen to match NIST database)
  private H0 = 225.35; // hJ/mol
  private S0 = 1.20076; // hJ/mol-K
  private T0 = 300; // K
  private P0 = 1; // bar

  // Gas Constant (R) [Units: L-bar/mol-K = hJ/mol-K] (Sets energy unit as hJ = 10^2 J)
  protected R = 8.314 * (10 ^ -2);

  constructor(
    fluidProps: FluidProperties,
    omega: number,
    psi: number,
    sigma: number,
    epsilon: number,
    alpha: number
  ) {
    this.fluidProps = fluidProps;
    this.omega = omega;
    this.psi = psi;
    this.sigma = sigma;
    this.epsilon = epsilon;
    this.alpha = alpha;
  }

  // Cubic Equation of State (SVAS-8th Edition, Section 3.6, Eqn. 3.41)
  protected aCoefficientCalculation() {
    const { criticalTemperature: Tc, criticalPressure: Pc } = this.fluidProps;
    const a = (this.alpha * this.psi * (this.R ^ 2) * (Tc ^ 2)) / Pc; // SVAS-8th Edition, Eqn. 3.45, Units:L^2-bar/mol^2
    return a;
  }

  protected bCoefficientCalculation() {
    const { criticalTemperature: Tc, criticalPressure: Pc } = this.fluidProps;
    const b = (this.omega * this.R * Tc) / Pc; // SVAS-8th Edition, Eqn. 3.44. Units:L/mol
    return b;
  }

  public pressureCalculation(temperature: number, volume: number) {
    const T = temperature;
    const V = volume;
    const a = this.aCoefficientCalculation();
    const b = this.bCoefficientCalculation();

    const pressure =
      (this.R * T) / (V - b) -
      a / ((V + this.epsilon * b) * (V + this.sigma * b)); // bar
    return pressure;
  }

  /* Ideal gas heat capacity Shomate equation (SVAS-8th Edition, Section 4.1)
  Heat capacity is in intergrated form of f(x) = (A + B * T + C * (T ^ 2) + D * (T ^ 3)) / 100 for enthalpy 
  f(x) / T for entropy and is from T0 to T due to lack of support in JavaScript for integrals. */
  protected integratedHeatCapacityCalculation(
    temperature: number,
    isEnthalpy: boolean
  ) {
    const T = temperature;
    const { A, B, C, D } = this.fluidProps;
    if (isEnthalpy) {
      const heatCapacity =
        (A * T -
          A * this.T0 +
          (B * ((T ^ 2) - (this.T0 ^ 2))) / 2 +
          (C * ((T ^ 3) - (this.T0 ^ 3))) / 3 +
          (D * ((T ^ 4) - (this.T0 ^ 4))) / 4) /
        100;
      return heatCapacity;
    }
    const heatCapacity =
      (A * (Math.log(T) - Math.log(this.T0)) +
        B * (T - this.T0) +
        (C * ((T ^ 2) - (this.T0 ^ 2))) / 2 +
        (D * ((T ^ 3) - (this.T0 ^ 3))) / 3) /
      100;
    return heatCapacity;
  }

  // Ideal gas enthalpy (SVAS-8th Edition, Section 6.1-6.2, Equations 6.23 and 6.24)
  protected idealEnthalpyCalculation(temperature: number) {
    const iEnthalpy =
      this.H0 + this.integratedHeatCapacityCalculation(temperature, true);
    return iEnthalpy;
  }
  // Ideal gas entropy (SVAS-8th Edition, Section 6.1-6.2, Equations 6.23 and 6.24)
  protected idealEntropyCalculation(temperature: number, volume: number) {
    const P = this.pressureCalculation(temperature, volume);
    const iEntropy =
      this.S0 +
      this.integratedHeatCapacityCalculation(temperature, false) -
      this.R * Math.log(P / this.P0);
    return iEntropy;
  }
}

// Subclass for van der Waals Equation of State.
export default class VanDerWaalsEOS extends EquationOfState {
  constructor(fluidProps: FluidProperties) {
    // van der Waals parameters, SVAS-8th Edition, Table 3.1
    const omega = 1 / 8;
    const psi = 27 / 64;
    const sigma = 0;
    const epsilon = 0;
    const alpha = 1;
    super(fluidProps, omega, psi, sigma, epsilon, alpha);
  }

  // van der Waals residual enthalpy (SVAS-8th Edition, Section 6.1-6.2, Problem 6.12)
  private residualEnthalpyCalculation(temperature: number, volume: number) {
    const T = temperature;
    const V = volume;
    const a = this.aCoefficientCalculation();
    const P = this.pressureCalculation(T, V);
    const resEnthalp = P * V - this.R * T - a / V; // hJ/mol
    return resEnthalp;
  }

  // van der Waals residual entropy (SVAS-8th Edition, Section 6.1-6.2, Problem 6.12)
  private residualEntropyCalculation(temperature: number, volume: number) {
    const T = temperature;
    const V = volume;
    const b = this.bCoefficientCalculation();
    const P = this.pressureCalculation(T, V);
    const resEntropy = this.R * Math.log((P * (V - b)) / (this.R * T));
    return resEntropy;
  }

  // Total enthalpy and entropy (SVAS-8th Edition, Section 6.1, Equation 6.41)
  public enthalpyCalculation(temperature: number, volume: number) {
    const iEnthalpy = this.idealEnthalpyCalculation(temperature);
    const resEnthalpy = this.residualEnthalpyCalculation(temperature, volume);
    const enthalpy = iEnthalpy + resEnthalpy;
    return enthalpy;
  }

  public entropyCalculation(temperature: number, volume: number) {
    const iEntropy = this.idealEntropyCalculation(temperature, volume);
    const resEntropy = this.residualEntropyCalculation(temperature, volume);
    const entropy = iEntropy + resEntropy;
    return entropy;
  }
}
