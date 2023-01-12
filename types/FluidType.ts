export enum FluidType {
  CarbonDioxide,
  Hydrogen,
  Nitrogen,
}

export interface FluidProperties {
  criticalTemperature: number;
  criticalPressure: number;
  A: number;
  B: number;
  C: number;
  D: number;
}
