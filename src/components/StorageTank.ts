import BoundaryConditions from '../types/BoundaryConditions'
import Fluid from './Fluid'
import SolarThermalSystemComponent from './SolarThermalSystemComponent'

// Treating StorageTank as a heat dissipator where heat is "lost" to the surroundings.
// Assume constant pressure step where inlet and outlet pressures are equal.
export default class StorageTank extends SolarThermalSystemComponent {
  constructor(fluid: Fluid, boundaryConditions: BoundaryConditions) {
    const name = 'StorageTank'
    super(name, fluid, boundaryConditions)
  }

  public outletEnthalpyCalculation() {
    const inletEnthalpy = this.inletEnthalpyCalculation()
    const outletEnthalpy = this.heatTransferToSurroundings + inletEnthalpy
    return outletEnthalpy
  }
}
