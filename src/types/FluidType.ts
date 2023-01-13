export enum FluidType {
  Water,
  CarbonDioxide,
  Hydrogen,
  Nitrogen,
}

export interface FluidProperties {
  criticalTemperature: number
  criticalPressure: number
  density: number
  A: number
  B: number
  C: number
  D: number
}
