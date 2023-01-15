import ComponentFactory from '../components/ComponentFactory'
import { Liquid } from '../components/Fluid'
import Pump from '../components/Pump'
import thermodynamicFluidsProperties from '../constants/fluidProps'
import VanDerWaalsEOS from '../EquationOfState'
import { FluidType } from '../types/FluidType'
import { UserInput } from '../types/Server'

describe('SolarPanel Test Suite', () => {
  let pump: Pump
  let input: UserInput
  beforeEach(() => {
    const fluidData = thermodynamicFluidsProperties[FluidType.Water]
    const eos = new VanDerWaalsEOS()

    input = {
      components: [
        {
          component: 'Pump',
          data: {
            pressureHead: 2, // bar
          },
        },
      ],
      fluid: new Liquid(fluidData, eos, 0.063), // fluid contains information about the fluid and its thermodynamics.
      boundaryConditions: {
        initialPressure: 5, // bar
        initialTemperature: 30 + 273.15, // K
      },
    }

    pump = ComponentFactory.createComponent(
      input.components[0].component,
      input.fluid,
      input.components[0].data,
      input.boundaryConditions
    ) as Pump
  })

  test('outletPressureCalculation result is pressure head plus initial pressure.', () => {
    expect(pump.outletPressureCalculation()).toEqual(7)
  })

  test('outletTemperature returns the initial temperature since there is no temperature change.', () => {
    expect(pump.outletTemperatureCalculation()).toEqual(
      input.boundaryConditions.initialTemperature
    )
  })
})
