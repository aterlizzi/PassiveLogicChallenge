import BoundaryConditions from '../types/BoundaryConditions'
import { PipeProperties } from '../types/PipeProperties'
import Fluid from './Fluid'
import SolarThermalSystemComponent from './SolarThermalSystemComponent'

// Neglecting pressure drop in the pipe. Not a good idea generally since it changes the thermodynamics, but considering the time constraints its reasonable.
export default class Pipe extends SolarThermalSystemComponent {
  pipeProps: PipeProperties

  constructor(
    fluid: Fluid,
    pipeProps: PipeProperties,
    boundaryConditions: BoundaryConditions
  ) {
    const name = 'Pipe'
    super(name, fluid, boundaryConditions)
    this.pipeProps = pipeProps
  }

  // Pressure drop in a straight pipe. We are neglecting the L-shaped turns of the pipe for simplicity.
  private pressureDropCalculation() {
    const { fanningFrictionFactor: f, diameter: D, length: L } = this.pipeProps
    const avgVelocity =
      this.fluid.volumetricFlowRate / 1000 / ((Math.PI * D ** 2) / 4)
    const { density } = this.fluid.data
    const delPressure = 2 * density * avgVelocity ** 2 * (L / D) * f
    return delPressure
  }

  public outletPressureCalculation() {
    const delPressure = this.pressureDropCalculation()
    const outletPressure =
      this.boundaryConditions.initialPressure * 100000 - delPressure
    return outletPressure / 100000
  }

  // This is an incredibly simplified model for how the temperature gradient behaves and assumes both constant density of fluid and heat capacity.
  public outletTemperatureCalculation(): number {
    const {
      length: L,
      heatTransferCoefficient: h,
      innerSurfaceTemperature: Tp,
      diameter: D,
    } = this.pipeProps
    const { density, heatCapacity: Cp } = this.fluid.data
    const area = (Math.PI * D ** 2) / 4
    const avgVelocity = this.fluid.volumetricFlowRate / area
    const delTemp =
      (2 * L * h * (Tp - this.boundaryConditions.initialTemperature)) /
      ((density * Cp * avgVelocity * D) / 2)
    return delTemp + this.boundaryConditions.initialTemperature
  }

  public outletEnthalpyCalculation(): number {
    const outletTemp = this.outletTemperatureCalculation()
    const outletPressure = this.outletPressureCalculation()
    return this.fluid.enthalpyCalculation(outletTemp, outletPressure)
  }

  public outletEntropyCalculation(): number {
    const outletTemp = this.outletTemperatureCalculation()
    const outletPressure = this.outletPressureCalculation()
    return this.fluid.entropyCalculation(outletTemp, outletPressure)
  }
}
