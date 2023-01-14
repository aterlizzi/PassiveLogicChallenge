import BoundaryConditions from '../types/BoundaryConditions'
import { PumpProperties } from '../types/PumpProps'
import Fluid from './Fluid'
import SolarThermalSystemComponent from './SolarThermalSystemComponent'

// In an ideal scenario, you would use a more sophisticated setup capable of solving systems of equations, such that so many knowns are not needed.
// For pumps, temperature change is negligible.
export default class Pump extends SolarThermalSystemComponent {
  pumpProps: PumpProperties

  constructor(
    fluid: Fluid,
    pumpProps: PumpProperties,
    boundaryConditions: BoundaryConditions
  ) {
    const name = 'Pump'
    super(name, fluid, boundaryConditions)
    this.pumpProps = pumpProps
  }

  public outletPressureCalculation() {
    return this.pumpProps.pressureHead + this.boundaryConditions.initialPressure
  }

  // Assume pump temperature increases are negligible.
  public outletTemperatureCalculation(): number {
    return this.boundaryConditions.initialTemperature
  }

  public outletEnthalpyCalculation(): number {
    const outletTemp = this.outletTemperatureCalculation()
    const outletPressure = this.outletPressureCalculation()
    return this.fluid.enthalpyCalculation(outletTemp, outletPressure)
  }

  public outletEntropyCalculation(): number {
    const outletTemp = this.outletTemperatureCalculation()
    const outletPressure = this.outletPressureCalculation()
    return this.fluid.entropyCalculation(outletTemp, outletPressure)
  }
}
