import EquationOfState from "../EquationOfState";
import bisection from "../utils/bisection";
import SolarThermalSystemComponent from "./SolarThermalSystemComponent";

// Treating StorageTank as a heat dissipator where heat is "lost" to the surroundings.
export default class StorageTank extends SolarThermalSystemComponent {
  inletPressure: number;
  inletTemperature: number;
  volume: number;
  heatTransferToSurroundings: number;

  constructor(
    eos: EquationOfState,
    volume: number,
    heatTransferToSurroundings: number
  ) {
    const name = "StorageTank";
    super(name, eos);
    this.volume = volume;
    this.heatTransferToSurroundings = heatTransferToSurroundings;
  }

  public outletEnthalpyCalculation() {
    const inletEnthalpy = this.inletEnthalpyCalculation();
    const outletEnthalpy = this.heatTransferToSurroundings + inletEnthalpy;
    return outletEnthalpy;
  }

  public outletEntropyCalculation() {
    const outletTemperature = this.outletTemperatureCalculation();
    const outletEntropy = this.eos.entropyCalculation(
      outletTemperature,
      this.volume
    );
    return outletEntropy;
  }

  public outletTemperatureCalculation() {
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
