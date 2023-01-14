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
    heatCapacity: 4.187, // kJ/Kg-K
    molarMass: 18.02,
    density: 997.77, // kg/m^3
    A: 32.24,
    B: 0.0019,
    C: 0.00001055,
    D: -0.000000003596,
  },
}

export default thermodynamicFluidsProperties
