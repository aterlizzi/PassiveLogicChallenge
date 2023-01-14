import { UserInput } from './types/Server'
import ComponentFactory from './components/ComponentFactory'
import thermodynamicFluidsProperties from './constants/fluidProps'
import { FluidType } from './types/FluidType'
import { Liquid } from './components/Fluid'
import VanDerWaalsEOS from './EquationOfState'

const fluidData = thermodynamicFluidsProperties[FluidType.Water]
const eos = new VanDerWaalsEOS()

const input: UserInput = {
  components: [
    {
      component: 'SolarPanel',
      data: {
        powerGen: 1000, // W/m^2
        solarSize: 2, // m^2
        residenceTime: 30, // seconds
      },
    },
    // Steel sheet pipe properties. You can take this from a database somewhere. Obviously it shouldnt be manually inputted.
    {
      component: 'Pipe',
      data: {
        fanningFrictionFactor: 0.02,
        diameter: 0.3, // meters
        length: 5, // meters
        thermalConductivity: 45, // W/(mK)
        specificHeat: 0.472, // J/g-°C
        innerSurfaceTemperature: 30 + 273.15, // K
        heatTransferCoefficient: 11.3, // People spend their entire lives trying to find the heatTransferCoefficient. So, needless to say this is an approximation.
      },
    },
    {
      component: 'Pump',
      data: {
        pressureHead: 2, // bar
      },
    },
    {
      component: 'Pipe',
      data: {
        fanningFrictionFactor: 0.02,
        diameter: 0.3, // meters
        length: 3, // meters
        thermalConductivity: 45, // W/(mK)
        specificHeat: 0.472, // J/g-°C
        innerSurfaceTemperature: 30 + 273.15, // K
        heatTransferCoefficient: 11.3, // People spend their entire lives trying to find the heatTransferCoefficient. So, needless to say this is an approximation.
      },
    },
    {
      component: 'StorageTank',
      data: {
        desiredOutletTemperature: 30 + 273.15, // K
        residenceTime: 30, // seconds
      },
    },
    {
      component: 'Pipe',
      data: {
        fanningFrictionFactor: 0.02,
        diameter: 0.3, // meters
        length: 8, // meters
        thermalConductivity: 45, // W/(mK)
        specificHeat: 0.472, // J/g-°C
        innerSurfaceTemperature: 30 + 273.15, // K
        heatTransferCoefficient: 11.3, // People spend their entire lives trying to find the heatTransferCoefficient. So, needless to say this is an approximation.
      },
    },
  ],
  fluid: new Liquid(fluidData, eos, 0.063),
  boundaryConditions: {
    initialPressure: 1, // bar
    initialTemperature: 30 + 273.15, // K
  },
}

const factory = new ComponentFactory()

// Define Equation of State to be used in approximations of thermodynamic properties.
