import thermodynamicFluidsProperties from '../constants/fluidProps'
import VanDerWaalsEOS from '../EquationOfState'
import { FluidType } from '../types/FluidType'
import Fluid, { Liquid, Gas } from '../components/Fluid'

describe('Fluid Test Suite', () => {
  let liquid: Fluid
  let gas: Fluid
  beforeEach(() => {
    const liquidData = thermodynamicFluidsProperties[FluidType.Water]
    const gasData = thermodynamicFluidsProperties[FluidType.CarbonDioxide]

    const eos = new VanDerWaalsEOS()
    liquid = new Liquid(liquidData, eos, 0.063)
    gas = new Gas(gasData, eos, 0.063)
  })

  test('getVolume() returns the original volume for liquid fluids.', () => {
    let temperature = 30 + 273.15
    let pressure = 1
    const originalVolume = liquid.getVolume(temperature, pressure)
    temperature = 40 + 273.15
    pressure = 2
    expect(liquid.getVolume(temperature, pressure)).toEqual(originalVolume)
  })

  test('getVolume() returns the new volume for gaseous fluids.', () => {
    let temperature = 30 + 273.15
    let pressure = 1
    const originalVolume = gas.getVolume(temperature, pressure)
    temperature = 40 + 273.15
    pressure = 2
    expect(gas.getVolume(temperature, pressure)).not.toEqual(originalVolume)
  })

  test('getDensity() returns given density for liquid fluids', () => {
    const temperature = 50 + 273.15
    const pressure = 1
    expect(liquid.getDensity(temperature, pressure)).toEqual(
      liquid.data.density
    )
  })

  test('getDensity() does not return given density for gaseous fluids', () => {
    const temperature = 50 + 273.15
    const pressure = 1
    expect(gas.getDensity(temperature, pressure)).not.toEqual(gas.data.density)
  })
})
