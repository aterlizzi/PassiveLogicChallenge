import { EquationOfState } from "../EquationOfState";
import { PipeProperties } from "../types/PipeProperties";
import SolarThermalSystemComponent from "./SolarThermalSystemComponent";

// Neglecting pressure drop in the pipe. Not a good idea generally since it changes the thermodynamics, but considering the time constraints its reasonable.
export default class Pipe extends SolarThermalSystemComponent {
  pipeProps: PipeProperties;
  avgVelocity: number;
  inletPressure: number;
  inletTemperature: number;
  innerSurfaceTemperature: number;

  // This is a property of the interaction between the fluid and the pipe material.
  heatTransferCoefficient: number;

  constructor(
    eos: EquationOfState,
    pipeProps: PipeProperties,
    avgVelocity: number,
    inletPressure: number,
    inletTemperature: number,
    innerSurfaceTemperature: number,
    heatTransferCoefficient: number
  ) {
    const name = "Pipe";
    super(name, eos);
    this.pipeProps = pipeProps;
    this.avgVelocity = avgVelocity;
    this.inletPressure = inletPressure;
    this.inletTemperature = inletTemperature;
    this.innerSurfaceTemperature = innerSurfaceTemperature;
    this.heatTransferCoefficient = heatTransferCoefficient;
  }

  // Pressure drop in a straight pipe. We are neglecting the L-shaped turns of the pipe for simplicity.
  private pressureDropCalculation() {
    const { fanningFrictionFactor: f, diameter: D, length: L } = this.pipeProps;
    const { density } = this.eos.fluidProps;
    const delPressure = 2 * density * this.avgVelocity ** 2 * (L / D) * f;
    return delPressure;
  }

  private alphaCalculation() {
    const { specificHeat: Cp, diameter: D } = this.pipeProps;
    const { density: row } = this.eos.fluidProps;
    const alpha =
      (4 * this.heatTransferCoefficient) / (Cp * row * this.avgVelocity * D);
    return alpha;
  }

  public outletPressureCalculation() {
    const delPressure = this.pressureDropCalculation();
    const outletPressure = delPressure + this.inletPressure;
    return outletPressure;
  }

  // This is an incredibly simplified model for how temperature gradient behaves and assumes both constant density of fluid and heat capacity.
  public outletTemperatureCalculation() {
    const { length: L } = this.pipeProps;
    const alpha = this.alphaCalculation();
    const ouletTemperature =
      this.innerSurfaceTemperature +
      (this.inletTemperature - this.innerSurfaceTemperature) *
        Math.exp(-1 * alpha * L);
    return ouletTemperature;
  }
}
