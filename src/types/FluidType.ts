export enum FluidType {
  Water,
}

export interface FluidProperties {
  criticalTemperature: number
  criticalPressure: number
  heatCapacity: number
  molarMass: number
  density: number
  A: number
  B: number
  C: number
  D: number
}
