export enum FluidType {
  CarbonDioxide,
  Water,
  Ethanol,
  Ethane,
}

export interface FluidProperties {
  criticalTemperature: number;
  criticalPressure: number;
  A: number;
  B: number;
  C: number;
  D: number;
}

export const fluidProperties = {
  [FluidType.CarbonDioxide]: {},
};
