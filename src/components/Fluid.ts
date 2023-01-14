import { EquationOfState } from '../EquationOfState'
import { FluidProperties } from '../types/FluidType'

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

  abstract getDensity(): number
  abstract getVolume(): number
}

export class Gas extends Fluid {
  getDensity(): number {}

  getVolume(): number {}
}

export class Liquid extends Fluid {
  getDensity(): number {}

  getVolume(): number {
    return this.data.vol
  }
}
