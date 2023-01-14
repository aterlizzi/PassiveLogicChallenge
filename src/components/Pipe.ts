import { EquationOfState } from '../EquationOfState'
import HeatTransferProperties from '../types/HeatTransferProperties'
import { PipeProperties } from '../types/PipeProperties'
import SolarThermalSystemComponent from './SolarThermalSystemComponent'

// Neglecting pressure drop in the pipe. Not a good idea generally since it changes the thermodynamics, but considering the time constraints its reasonable.
export default class Pipe extends SolarThermalSystemComponent {
  pipeProps: PipeProperties

  inletPressure: number

  heatTransferProps: HeatTransferProperties

  volumetricFlowRate: number

  constructor(
    eos: EquationOfState,
    pipeProps: PipeProperties,
    heatTransferProps: HeatTransferProperties,
    volumetricFlowRate: number,
    volume: number,
    inletPressure: number,
    inletTemperature: number
  ) {
    const name = 'Pipe'
    super(name, eos, volume, inletTemperature)
    this.pipeProps = pipeProps
    this.inletPressure = inletPressure
    this.heatTransferProps = heatTransferProps
    this.volumetricFlowRate = volumetricFlowRate
  }

  // Pressure drop in a straight pipe. We are neglecting the L-shaped turns of the pipe for simplicity.
  private pressureDropCalculation() {
    const { fanningFrictionFactor: f, diameter: D, length: L } = this.pipeProps
    const avgVelocity =
      this.volumetricFlowRate / 1000 / ((Math.PI * D ** 2) / 4)
    const { density } = this.eos.fluidProps
    const delPressure = 2 * density * avgVelocity ** 2 * (L / D) * f
    return delPressure
  }

  private alphaCalculation() {
    const { heatTransferCoefficient } = this.heatTransferProps
    const { specificHeat: Cp, diameter: D } = this.pipeProps
    const avgVelocity =
      this.volumetricFlowRate / 1000 / ((Math.PI * D ** 2) / 4)
    const { density: row } = this.eos.fluidProps
    const alpha = (4 * heatTransferCoefficient) / (Cp * row * avgVelocity * D)
    return alpha
  }

  public outletPressureCalculation() {
    const delPressure = this.pressureDropCalculation()
    const outletPressure = this.inletPressure * 100000 - delPressure
    return outletPressure / 100000
  }

  // This is an incredibly simplified model for how the temperature gradient behaves and assumes both constant density of fluid and heat capacity.
  public outletTemperatureCalculation() {
    const { innerSurfaceTemperature } = this.heatTransferProps
    const { length: L } = this.pipeProps
    const alpha = this.alphaCalculation()
    const ouletTemperature =
      innerSurfaceTemperature +
      (this.inletTemperature - innerSurfaceTemperature) *
        Math.exp(-1 * alpha * L)
    return ouletTemperature
  }

  public outletEnthalpyCalculation() {
    const outletTemperature = this.outletTemperatureCalculation()
    const outletEnthalpy = this.eos.enthalpyCalculation(
      outletTemperature,
      this.volume
    )
    return outletEnthalpy
  }
}
