import { Gas, Liquid } from '../components/Fluid'
import thermodynamicFluidsProperties from '../constants/fluidProps'
import VanDerWaalsEOS from '../EquationOfState'
import { FluidType } from '../types/FluidType'
import { UserInput } from '../types/Server'
import ComponentFactory from '../components/ComponentFactory'
import NoGaseousPumpsError from '../errors/pump'
import ComponentLackingSetupError from '../errors/factory'
import SolarPanel from '../components/SolarPanel'
import Pipe from '../components/Pipe'
import Pump from '../components/Pump'
import StorageTank from '../components/StorageTank'

describe('Factory test suite', () => {
  let input: UserInput
  const liquidData = thermodynamicFluidsProperties[FluidType.Water]
  const gasData = thermodynamicFluidsProperties[FluidType.CarbonDioxide]
  const eos = new VanDerWaalsEOS()
  beforeEach(() => {
    input = {
      components: [
        {
          component: 'SolarPanel',
          data: {
            powerGen: 1000, // W/m^2
            solarSize: 2, // m^2
          },
        },
        // Steel sheet pipe properties. You can take this from a database somewhere. Obviously it shouldnt be manually inputted.
        {
          component: 'Pipe',
          data: {
            fanningFrictionFactor: 0.02,
            diameter: 0.1, // meters
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
            diameter: 0.1, // meters
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
          },
        },
        {
          component: 'Pipe',
          data: {
            fanningFrictionFactor: 0.02,
            diameter: 0.1, // meters
            length: 8, // meters
            thermalConductivity: 45, // W/(mK)
            specificHeat: 0.472, // J/g-°C
            innerSurfaceTemperature: 30 + 273.15, // K
            heatTransferCoefficient: 11.3, // People spend their entire lives trying to find the heatTransferCoefficient. So, needless to say this is an approximation.
          },
        },
      ],
      fluid: new Gas(gasData, eos, 0.063), // fluid contains information about the fluid and its thermodynamics.
      boundaryConditions: {
        initialPressure: 1, // bar
        initialTemperature: 30 + 273.15, // K
      },
    }
  })

  test('createComponent() returns an error when trying to create a pump for a gas.', () => {
    expect(() => {
      ComponentFactory.createComponent(
        input.components[2].component,
        input.fluid,
        input.components[2].data,
        input.boundaryConditions
      )
    }).toThrowError(NoGaseousPumpsError)
  })

  test('createComponent() returns an error when trying to create a component that doesnt exist.', () => {
    expect(() => {
      ComponentFactory.createComponent(
        "PassiveLogic'sFridge",
        input.fluid,
        input.components[0].data,
        input.boundaryConditions
      )
    }).toThrowError(ComponentLackingSetupError)
  })

  test('createComponent creates solar panel component', () => {
    input.fluid = new Liquid(liquidData, eos, 0.063)
    expect(
      ComponentFactory.createComponent(
        input.components[0].component,
        input.fluid,
        input.components[0].data,
        input.boundaryConditions
      )
    ).toBeInstanceOf(SolarPanel)
  })

  test('createComponent creates pipe component', () => {
    input.fluid = new Liquid(liquidData, eos, 0.063)
    expect(
      ComponentFactory.createComponent(
        input.components[1].component,
        input.fluid,
        input.components[1].data,
        input.boundaryConditions
      )
    ).toBeInstanceOf(Pipe)
  })

  test('createComponent creates Pump component', () => {
    input.fluid = new Liquid(liquidData, eos, 0.063)
    expect(
      ComponentFactory.createComponent(
        input.components[2].component,
        input.fluid,
        input.components[2].data,
        input.boundaryConditions
      )
    ).toBeInstanceOf(Pump)
  })

  test('createComponent creates storage tank component', () => {
    input.fluid = new Liquid(liquidData, eos, 0.063)
    expect(
      ComponentFactory.createComponent(
        input.components[4].component,
        input.fluid,
        input.components[4].data,
        input.boundaryConditions
      )
    ).toBeInstanceOf(StorageTank)
  })
})
