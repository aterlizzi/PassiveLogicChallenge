import EquationOfState from "../EquationOfState";
import bisection from "../utils/bisection";
import SolarThermalSystemComponent from "./SolarThermalSystemComponent";

// I'm choosing to treat the solar panel as a "heater", such that it receives heat which heats the fluid. In real world applications, solar panels might additionally compress or pump the fluid.
// Assuming this is a constant pressure step, where inlet and outlet pressures are equal.
export default class SolarPanel extends SolarThermalSystemComponent {
  solarPanelSize: number; // m^2
  powerGen: number; // W/m^2
  inletPressure: number;

  constructor(
    eos: EquationOfState,
    solarPanelSize: number,
    powerGen: number,
    inletTemperature: number,
    inletPressure: number,
    volume: number
  ) {
    const name = "SolarPanel";
    super(name, eos, volume, inletTemperature);
    this.solarPanelSize = solarPanelSize;
    this.powerGen = powerGen;
    this.inletPressure = inletPressure;
  }

  private totalPowerGenerationCalculation() {
    const totalPower = this.solarPanelSize * this.powerGen;
    return totalPower;
  }

  public outletEnthalpyCalculation() {
    const inletEnthalpy = this.inletEnthalpyCalculation();
    const totalHeatInput = this.totalPowerGenerationCalculation();
    const outletEnthalpy = totalHeatInput + inletEnthalpy;
    return outletEnthalpy;
  }
}
