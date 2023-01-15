export enum FluidType {
  Water,
  CarbonDioxide,
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
