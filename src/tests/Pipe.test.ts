import ComponentFactory from '../components/ComponentFactory'
import { Liquid } from '../components/Fluid'
import Pipe from '../components/Pipe'
import thermodynamicFluidsProperties from '../constants/fluidProps'
import VanDerWaalsEOS from '../EquationOfState'
import { FluidType } from '../types/FluidType'
import { UserInput } from '../types/Server'

describe('SolarPanel Test Suite', () => {
  let pipe: Pipe
  let input: UserInput
  beforeEach(() => {
    const fluidData = thermodynamicFluidsProperties[FluidType.Water]
    const eos = new VanDerWaalsEOS()

    input = {
      components: [
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
      ],
      fluid: new Liquid(fluidData, eos, 0.063), // fluid contains information about the fluid and its thermodynamics.
      boundaryConditions: {
        initialPressure: 5, // bar
        initialTemperature: 30 + 273.15, // K
      },
    }

    pipe = ComponentFactory.createComponent(
      input.components[0].component,
      input.fluid,
      input.components[0].data,
      input.boundaryConditions
    ) as Pipe
  })

  test('outletPressureCalculation result is less than initial pressure because of pressure drop.', () => {
    expect(pipe.outletPressureCalculation()).toBeLessThan(
      input.boundaryConditions.initialPressure
    )
  })

  test('outletTemperature returns temperature less than initial because of heat loss.', () => {
    expect(pipe.outletTemperatureCalculation()).toBeLessThanOrEqual(
      input.boundaryConditions.initialTemperature
    )
  })
})
