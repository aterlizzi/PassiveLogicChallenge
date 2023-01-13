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
export default class Pump extends SolarThermalSystemComponent {
  workInput: number; // kJ/kg
  pumpEfficiency: number;
  inletPressure: number; // kPa

  constructor(
    eos: EquationOfState,
    workInput: number,
    pumpEfficiency: number,
    volume: number,
    inletPressure: number,
    inletTemperature: number
  ) {
    const name = "Pump";
    super(name, eos, volume, inletTemperature);
    this.workInput = workInput;
    this.pumpEfficiency = pumpEfficiency;
    this.inletPressure = inletPressure;
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
}
