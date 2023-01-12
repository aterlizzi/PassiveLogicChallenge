import EquationOfState from "../EquationOfState";
import bisection from "../utils/bisection";
import SolarThermalSystemComponent from "./SolarThermalSystemComponent";

// I'm choosing to treat the solar panel as a "heater", such that it receives heat which heats the fluid. In real world applications, solar panels might additionally compress or pump the fluid.
// Assuming this is a constant pressure step, where inlet and outlet pressures are equal.
export default class SolarPanel extends SolarThermalSystemComponent {
  solarPanelSize: number; // m^2
  powerGen: number; // W/m^2
  inletTemperature: number;
  inletPressure: number;
  volume: number;

  constructor(
    eos: EquationOfState,
    solarPanelSize: number,
    powerGen: number,
    inletTemperature: number,
    inletPressure: number,
    volume: number
  ) {
    const name = "SolarPanel";
    super(name, eos);
    this.solarPanelSize = solarPanelSize;
    this.powerGen = powerGen;
    this.inletTemperature = inletTemperature;
    this.inletPressure = inletPressure;
    this.volume = volume;
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

  public outletTemperatureCalculation() {
    const outletEnthalpy = this.outletEnthalpyCalculation();
    const outletTemperature = bisection(
      this.eos.enthalpyCalculation,
      outletEnthalpy,
      0,
      20000,
      0.01,
      1000,
      this.volume
    );
    return outletTemperature;
  }

  public outletEntropyCalculation() {
    const outletTemperature = this.outletTemperatureCalculation();
    const outletEntropy = this.eos.entropyCalculation(
      outletTemperature,
      this.volume
    );
    return outletEntropy;
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
