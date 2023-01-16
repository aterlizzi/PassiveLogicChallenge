import ComponentFactory from '../components/ComponentFactory'
import { Liquid } from '../components/Fluid'
import StorageTank from '../components/StorageTank'
import thermodynamicFluidsProperties from '../constants/fluidProps'
import VanDerWaalsEOS from '../EquationOfState'
import { FluidType } from '../types/FluidType'
import { UserInput } from '../types/Server'

describe('SolarPanel Test Suite', () => {
  let tank: StorageTank
  let input: UserInput
  beforeEach(() => {
    const fluidData = thermodynamicFluidsProperties[FluidType.Water]
    const eos = new VanDerWaalsEOS()

    input = {
      components: [
        {
          component: 'StorageTank',
          data: {
            desiredOutletTemperature: 30 + 273.15, // K
          },
        },
      ],
      fluid: new Liquid(fluidData, eos, 0.063), // fluid contains information about the fluid and its thermodynamics.
      boundaryConditions: {
        initialPressure: 5, // bar
        initialTemperature: 30 + 273.15, // K
      },
    }

    tank = ComponentFactory.createComponent(
      input.components[0].component,
      input.fluid,
      input.components[0].data,
      input.boundaryConditions
    ) as StorageTank
  })

  test('outletPressureCalculation result is equal to initial. Constant pressure operation.', () => {
    expect(tank.outletPressureCalculation()).toEqual(
      input.boundaryConditions.initialPressure
    )
  })

  test('outletTemperature returns temperature equal to desired output.', () => {
    expect(tank.outletTemperatureCalculation()).toEqual(
      tank.storageTankProps.desiredOutletTemperature
    )
  })

  test('heatGeneratedCalculation should result in either some or no heat lossed.', () => {
    expect(tank.heatGeneratedCalculation()).toBeLessThanOrEqual(0)
  })
})
