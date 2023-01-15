import ComponentFactory from '../components/ComponentFactory'
import { Liquid } from '../components/Fluid'
import SolarPanel from '../components/SolarPanel'
import thermodynamicFluidsProperties from '../constants/fluidProps'
import VanDerWaalsEOS from '../EquationOfState'
import { FluidType } from '../types/FluidType'
import { UserInput } from '../types/Server'

describe('SolarPanel Test Suite', () => {
  let solarPanel: SolarPanel
  let input: UserInput
  beforeEach(() => {
    const fluidData = thermodynamicFluidsProperties[FluidType.Water]
    const eos = new VanDerWaalsEOS()

    input = {
      components: [
        {
          component: 'SolarPanel',
          data: {
            powerGen: 1000, // W/m^2
            solarSize: 2, // m^2
          },
        },
      ],
      fluid: new Liquid(fluidData, eos, 0.063), // fluid contains information about the fluid and its thermodynamics.
      boundaryConditions: {
        initialPressure: 1, // bar
        initialTemperature: 30 + 273.15, // K
      },
    }

    solarPanel = ComponentFactory.createComponent(
      input.components[0].component,
      input.fluid,
      input.components[0].data,
      input.boundaryConditions
    ) as SolarPanel
  })

  test('outletTemperatureCalculation result is greater than the initial temperature provided.', () => {
    expect(solarPanel.outletTemperatureCalculation()).toBeGreaterThan(
      input.boundaryConditions.initialTemperature
    )
  })

  test('outputPressureCalculation returns the initial pressure since there is no pressure change.', () => {
    expect(solarPanel.outletPressureCalculation()).toBe(
      input.boundaryConditions.initialPressure
    )
  })
})
