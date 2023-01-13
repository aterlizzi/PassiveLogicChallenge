import EquationOfState from "../EquationOfState";
import bisection from "../utils/bisection";
import SolarThermalSystemComponent from "./SolarThermalSystemComponent";

// Treating StorageTank as a heat dissipator where heat is "lost" to the surroundings.
// Assume constant pressure step where inlet and outlet pressures are equal.
export default class StorageTank extends SolarThermalSystemComponent {
  inletPressure: number;
  heatTransferToSurroundings: number;

  constructor(
    eos: EquationOfState,
    volume: number,
    inletTemperature: number,
    heatTransferToSurroundings: number
  ) {
    const name = "StorageTank";
    super(name, eos, volume, inletTemperature);
    this.heatTransferToSurroundings = heatTransferToSurroundings;
  }

  public outletEnthalpyCalculation() {
    const inletEnthalpy = this.inletEnthalpyCalculation();
    const outletEnthalpy = this.heatTransferToSurroundings + inletEnthalpy;
    return outletEnthalpy;
  }
}
