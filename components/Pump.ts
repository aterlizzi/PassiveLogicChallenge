import EquationOfState from "../EquationOfState";
import bisection from "../utils/bisection";
import SolarThermalSystemComponent from "./SolarThermalSystemComponent";

// In an ideal scenario, you would use a more sophisticated setup capable of solving systems of equations, such that so many knowns are not needed.
// Known volume, since liquids are approximately incompressible.
// Known inlet temp
// Known inlet pressure
// Calc outlet pressure
// Calc outlet temp
// Calc enthalpy
// Calc entropy
export class Pump extends SolarThermalSystemComponent {
  workInput: number; // kJ/kg
  pumpEfficiency: number;
  volume: number; // m^3/kg
  inletPressure: number; // kPa
  inletTemperature: number; // K

  constructor(
    eos: EquationOfState,
    workInput: number,
    pumpEfficiency: number,
    volume: number,
    inletPressure: number,
    inletTemperature: number
  ) {
    const name = "Pump";
    super(name, eos);
    this.workInput = workInput;
    this.pumpEfficiency = pumpEfficiency;
    this.volume = volume;
    this.inletPressure = inletPressure;
    this.inletTemperature = inletTemperature;
  }

  private idealWorkCalculation() {
    const idealWork = this.workInput * this.pumpEfficiency;
    return idealWork;
  }

  //   Outlet value functions.
  public outletPressureCalculation() {
    const idealWork = this.idealWorkCalculation();
    const delPressure = idealWork / this.volume;
    const outletPressure = delPressure + this.inletPressure;
    return outletPressure;
  }

  public outletEnthalpyCalculation() {
    const inletEnthalpy = this.inletEnthalpyCalculation();
    const outletEnthalpy = this.workInput + inletEnthalpy;
    return outletEnthalpy;
  }

  // Assume reversible pump, therefore delEntropy = 0
  public outletEntropyCalculation() {
    return this.inletEntropyCalculation();
  }

  public outletTemperature() {
    const outletEnthalpy = this.outletEnthalpyCalculation();
    const outletTemp = bisection(
      this.eos.enthalpyCalculation,
      outletEnthalpy,
      0,
      20000,
      0.01,
      1000,
      this.volume
    );
    return outletTemp;
  }

  public inletEnthalpyCalculation() {
    const inletEnthalpy = this.eos.enthalpyCalculation(
      this.inletTemperature,
      this.volume
    );
    return inletEnthalpy;
  }

  public inletEntropyCalculation() {
    const inletEntropy = this.eos.entropyCalculation(
      this.inletTemperature,
      this.volume
    );
    return inletEntropy;
  }
}
