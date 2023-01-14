import { EquationOfState } from '../EquationOfState'
import bisection from '../utils/bisection'

export default abstract class SolarThermalSystemComponent {
  name: string

  eos: EquationOfState

  volume: number // L/mol

  inletTemperature: number

  abstract outletEnthalpyCalculation(): number

  constructor(
    name: string,
    eos: EquationOfState,
    volume: number,
    inletTemperature: number
  ) {
    this.name = name
    this.eos = eos
    this.volume = volume
    this.inletTemperature = inletTemperature
  }

  public outletTemperatureCalculation() {
    const outletEnthalpy = this.outletEnthalpyCalculation()
    const outletTemp = bisection(
      this.eos.enthalpyCalculation.bind(this.eos),
      outletEnthalpy,
      10000,
      0,
      0.001,
      10000,
      this.volume
    )
    return outletTemp
  }

  public outletEntropyCalculation() {
    const outletTemperature = this.outletTemperatureCalculation()
    const outletEntropy = this.eos.entropyCalculation(
      outletTemperature,
      this.volume
    )
    return outletEntropy
  }

  public inletEnthalpyCalculation() {
    const inletEnthalpy = this.eos.enthalpyCalculation(
      this.inletTemperature,
      this.volume
    )
    return inletEnthalpy
  }
}
