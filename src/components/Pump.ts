import { EquationOfState } from '../EquationOfState'
import SolarThermalSystemComponent from './SolarThermalSystemComponent'

// In an ideal scenario, you would use a more sophisticated setup capable of solving systems of equations, such that so many knowns are not needed.
// For pumps, temperature change is negligible.
export default class Pump extends SolarThermalSystemComponent {
  pumpEfficiency: number

  inletPressure: number // kPa

  volumetricFlowRate: number

  pumpHead: number

  constructor(
    eos: EquationOfState,
    pumpEfficiency: number,
    volumetricFlowRate: number,
    pumpHead: number,
    volume: number,
    inletPressure: number,
    inletTemperature: number
  ) {
    const name = 'Pump'
    super(name, eos, volume, inletTemperature)
    this.pumpHead = pumpHead
    this.pumpEfficiency = pumpEfficiency
    this.volumetricFlowRate = volumetricFlowRate
    this.inletPressure = inletPressure
  }

  public outputPressureCalculation() {
    return this.pumpHead + this.inletPressure
  }
}
