import { EquationOfState } from '../EquationOfState'
import SolarThermalSystemComponent from './SolarThermalSystemComponent'

// Treating StorageTank as a heat dissipator where heat is "lost" to the surroundings.
// Assume constant pressure step where inlet and outlet pressures are equal.
export default class StorageTank extends SolarThermalSystemComponent {
  heatTransferToSurroundings: number

  constructor(
    eos: EquationOfState,
    heatTransferToSurroundings: number,
    volume: number,
    inletTemperature: number
  ) {
    const name = 'StorageTank'
    super(name, eos, volume, inletTemperature)
    this.heatTransferToSurroundings = heatTransferToSurroundings
  }

  public outletEnthalpyCalculation() {
    const inletEnthalpy = this.inletEnthalpyCalculation()
    const outletEnthalpy = this.heatTransferToSurroundings + inletEnthalpy
    return outletEnthalpy
  }
}