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

  private alphaCalculation() {
    const {
      specificHeat: Cp,
      diameter: D,
      heatTransferCoefficient: h,
    } = this.pipeProps
    const avgVelocity =
      this.fluid.volumetricFlowRate / 1000 / ((Math.PI * D ** 2) / 4)
    const { density: row } = this.fluid.data
    const alpha = (4 * h) / (Cp * row * avgVelocity * D)
    return alpha
  }

  public outletPressureCalculation() {
    const delPressure = this.pressureDropCalculation()
    const outletPressure =
      this.boundaryConditions.initialPressure * 100000 - delPressure
    return outletPressure / 100000
  }

  // This is an incredibly simplified model for how the temperature gradient behaves and assumes both constant density of fluid and heat capacity.
  public outletTemperatureCalculation() {
    const { innerSurfaceTemperature: Ts } = this.pipeProps
    const { length: L } = this.pipeProps
    const alpha = this.alphaCalculation()
    const ouletTemperature =
      Ts +
      (this.boundaryConditions.initialTemperature - Ts) *
        Math.exp(-1 * alpha * L)
    return ouletTemperature
  }

  public outletEnthalpyCalculation() {
    const outletTemperature = this.outletTemperatureCalculation()
    const volume = this.fluid.getVolume(
      outletTemperature,
      this.outletPressureCalculation()
    )
    const outletEnthalpy = this.eos.enthalpyCalculation(
      outletTemperature,
      volume
    )
    return outletEnthalpy
  }
}
