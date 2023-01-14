import { EquationOfState } from '../EquationOfState'
import { FluidProperties } from '../types/FluidType'
import bisection from '../utils/bisection'

export default abstract class Fluid {
  data: FluidProperties

  eos: EquationOfState

  volumetricFlowRate: number // L/s

  constructor(
    data: FluidProperties,
    eos: EquationOfState,
    volumetricFlowRate: number
  ) {
    this.data = data
    this.eos = eos
    this.volumetricFlowRate = volumetricFlowRate
  }

  abstract getVolume(temperature: number, pressure: number): number

  public entropyCalculation(temperature: number, pressure: number) {
    const volume = this.getVolume(temperature, pressure)
    return this.eos.entropyCalculation(temperature, volume, this.data)
  }

  public enthalpyCalculation(temperature: number, pressure: number) {
    const volume = this.getVolume(temperature, pressure)
    return this.eos.enthalpyCalculation(temperature, volume, this.data)
  }
}

export class Gas extends Fluid {
  getVolume(temperature: number, pressure: number): number {
    return bisection(
      this.eos.pressureCalculation.bind(this),
      pressure,
      5,
      0,
      0.01,
      10000,
      temperature,
      true,
      this.data.criticalTemperature,
      this.data.criticalPressure
    )
  }
}

export class Liquid extends Fluid {
  volume: number = 0

  // I am neglecting volume change in liquids for simplicity, these generally change a small amount with temperature.
  getVolume(temperature: number, pressure: number): number {
    if (this.volume) return this.volume
    this.volume = bisection(
      this.eos.pressureCalculation.bind(this),
      pressure,
      5,
      0,
      0.01,
      10000,
      temperature,
      true,
      this.data.criticalTemperature,
      this.data.criticalPressure
    )
    return this.volume
  }
}