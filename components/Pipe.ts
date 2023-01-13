import { EquationOfState } from "../EquationOfState";
import HeatTransferProperties from "../types/HeatTransferProperties";
import { PipeProperties } from "../types/PipeProperties";
import SolarThermalSystemComponent from "./SolarThermalSystemComponent";

// Neglecting pressure drop in the pipe. Not a good idea generally since it changes the thermodynamics, but considering the time constraints its reasonable.
export default class Pipe extends SolarThermalSystemComponent {
  pipeProps: PipeProperties;
  avgVelocity: number;
  inletPressure: number;
  heatTransferProps: HeatTransferProperties;

  constructor(
    eos: EquationOfState,
    pipeProps: PipeProperties,
    heatTransferProps: HeatTransferProperties,
    avgVelocity: number,
    inletPressure: number,
    inletTemperature: number,
    volume: number
  ) {
    const name = "Pipe";
    super(name, eos, volume, inletTemperature);
    this.pipeProps = pipeProps;
    this.avgVelocity = avgVelocity;
    this.inletPressure = inletPressure;
  }

  // Pressure drop in a straight pipe. We are neglecting the L-shaped turns of the pipe for simplicity.
  private pressureDropCalculation() {
    const { fanningFrictionFactor: f, diameter: D, length: L } = this.pipeProps;
    const { density } = this.eos.fluidProps;
    const delPressure = 2 * density * this.avgVelocity ** 2 * (L / D) * f;
    return delPressure;
  }

  private alphaCalculation() {
    const { heatTransferCoefficient } = this.heatTransferProps;
    const { specificHeat: Cp, diameter: D } = this.pipeProps;
    const { density: row } = this.eos.fluidProps;
    const alpha =
      (4 * heatTransferCoefficient) / (Cp * row * this.avgVelocity * D);
    return alpha;
  }

  public outletPressureCalculation() {
    const delPressure = this.pressureDropCalculation();
    const outletPressure = delPressure + this.inletPressure;
    return outletPressure;
  }

  // This is an incredibly simplified model for how the temperature gradient behaves and assumes both constant density of fluid and heat capacity.
  public outletTemperatureCalculation() {
    const { innerSurfaceTemperature } = this.heatTransferProps;
    const { length: L } = this.pipeProps;
    const alpha = this.alphaCalculation();
    const ouletTemperature =
      innerSurfaceTemperature +
      (this.inletTemperature - innerSurfaceTemperature) *
        Math.exp(-1 * alpha * L);
    return ouletTemperature;
  }

  public outletEnthalpyCalculation() {
    const outletTemperature = this.outletTemperatureCalculation();
    const outletEnthalpy = this.eos.enthalpyCalculation(
      outletTemperature,
      this.volume
    );
    return outletEnthalpy;
  }
}
