import Pipe from './components/Pipe'
import thermodynamicFluidsProperties from './constants/fluidProps'
import VanDerWaalsEOS from './EquationOfState'
import { FluidType } from './types/FluidType'
import pipeProps from './constants/pipeProps'
import SolarPanel from './components/SolarPanel'
import HeatTransferProperties from './types/HeatTransferProperties'
import Pump from './components/Pump'
import StorageTank from './components/StorageTank'

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
const eos = new VanDerWaalsEOS(waterProps)
const solar = new SolarPanel(
  eos,
  solarPowerGen,
  solarSize,
  volumetricFlowRate,
  residenceTime,
  solarInletTemp,
  volume
)
const solarOutTemp = solar.outletTemperatureCalculation()
console.log(solarOutTemp)
const pipeOne = new Pipe(
  eos,
  pipeProps,
  heatTransferProps,
  volumetricFlowRate,
  volume,
  solarOutletPressure,
  solarOutTemp
)
let outletTemp = pipeOne.outletTemperatureCalculation()
let outletPressure = pipeOne.outletPressureCalculation()
console.log(outletTemp)
console.log(outletPressure)
const pump = new Pump(
  eos,
  pumpEfficiency,
  volumetricFlowRate,
  pressureHead,
  volume,
  outletPressure,
  outletTemp
)
outletPressure = pump.outputPressureCalculation()
console.log(pump.outputPressureCalculation())
const pipeTwo = new Pipe(
  eos,
  pipeProps,
  heatTransferProps,
  volumetricFlowRate,
  volume,
  outletPressure,
  outletTemp
)
outletTemp = pipeTwo.outletTemperatureCalculation()
outletPressure = pipeTwo.outletPressureCalculation()
console.log(outletPressure)
// Cycle: SolarPanel -> Pipe -> Pump -> Pipe -> StorageTank -> Pipe -> SolarPanel
