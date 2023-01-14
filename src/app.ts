import thermodynamicFluidsProperties from './constants/fluidProps'
import { FluidType } from './types/FluidType'

// Constants
// Fluid properties for Carbon Dioxide
const waterProps = thermodynamicFluidsProperties[FluidType.Water]
const solarPowerGen = 1000 // W/m^2
const solarSize = 2 // m^2
const volumetricFlowRate = 0.063 // L/s
const solarInletTemp = 30 + 273.15 // K
const volume = 0.018094 // L/mol
const residenceTime = 30 // seconds
const solarOutletPressure = 1 // bar
const pumpEfficiency = 0.75
const pressureHead = 2 // bar
const heatTransferProps: HeatTransferProperties = {
  innerSurfaceTemperature: 30 + 273.15, // K
  heatTransferCoefficient: 11.3, //
}
// const heatTransferToSurroundings = 100

// Define Equation of State to be used in approximations of thermodynamic properties.
