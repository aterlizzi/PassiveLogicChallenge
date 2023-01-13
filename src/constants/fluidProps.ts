import { FluidProperties, FluidType } from '../types/FluidType'

export interface ThermodynamicFluidsProps {
  [key: number]: FluidProperties
}

// These should really be coming from a database and not stored in a javascript object...
// From: Elliott and Lira, 2nd Edition
const thermodynamicFluidsProperties: ThermodynamicFluidsProps = {
  [FluidType.Water]: {
    criticalTemperature: 647.3,
    criticalPressure: 221.2,
    density: 997.77, // kg/m^3
    A: 32.24,
    B: 0.0019,
    C: 0.00001055,
    D: -0.000000003596,
  },
  [FluidType.CarbonDioxide]: {
    criticalTemperature: 304.2, // K
    criticalPressure: 73.82, // bar
    density: 1.87, // kg/m^3
    A: 19.8,
    B: 0.07344,
    C: -0.00005602,
    D: 0.00000001715,
  },
  [FluidType.Hydrogen]: {
    criticalTemperature: 33.3,
    criticalPressure: 12.97,
    density: 0.08375,
    A: 27.14,
    B: 0.009274,
    C: -0.00001381,
    D: 0.000000007645,
  },
  [FluidType.Nitrogen]: {
    criticalPressure: 126.1,
    criticalTemperature: 33.94,
    density: 1.2501,
    A: 31.15,
    B: -0.01357,
    C: 0.0000268,
    D: -0.00000001168,
  },
}

export default thermodynamicFluidsProperties
