import { FluidProperties, FluidType } from "../types/FluidType";

export interface FluidsProps {
  [key: number]: FluidProperties;
}

// These should really be coming from a database and not stored in a javascript object...
// From: Elliott and Lira, 2nd Edition
const thermodynamicFluidsProperties: FluidsProps = {
  [FluidType.CarbonDioxide]: {
    criticalTemperature: 304.2, // K
    criticalPressure: 73.82, // bar
    A: 19.8,
    B: 0.07344,
    C: -0.00005602,
    D: 0.00000001715,
  },
  [FluidType.Hydrogen]: {
    criticalTemperature: 33.3,
    criticalPressure: 12.97,
    A: 27.14,
    B: 0.009274,
    C: -0.00001381,
    D: 0.000000007645,
  },
  [FluidType.Nitrogen]: {
    criticalPressure: 126.1,
    criticalTemperature: 33.94,
    A: 31.15,
    B: -0.01357,
    C: 0.0000268,
    D: -0.00000001168,
  },
};

export default thermodynamicFluidsProperties;
