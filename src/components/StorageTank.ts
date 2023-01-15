import BoundaryConditions from '../types/BoundaryConditions'
import { StorageTankProperties } from '../types/StorageTankProps'
import Fluid from './Fluid'
import SolarThermalSystemComponent from './SolarThermalSystemComponent'

// Treating StorageTank as a heat dissipator where heat is "lost" to the surroundings.
// Assume constant pressure step where inlet and outlet pressures are equal.
export default class StorageTank extends SolarThermalSystemComponent {
  storageTankProps: StorageTankProperties

  constructor(
    fluid: Fluid,
    storageTankProps: StorageTankProperties,
    boundaryConditions: BoundaryConditions
  ) {
    const name = 'StorageTank'
    super(name, fluid, boundaryConditions)
    this.storageTankProps = storageTankProps
  }

  private massFlowRateCalculation() {
    const { density } = this.fluid.data
    const kgPerSecond = (this.fluid.volumetricFlowRate / 1000) * density
    return kgPerSecond
  }

  // Assume this is a constant pressure step.
  public outletPressureCalculation(): number {
    return this.boundaryConditions.initialPressure
  }

  public outletTemperatureCalculation(): number {
    return this.storageTankProps.desiredOutletTemperature
  }

  public heatGeneratedCalculation(): number {
    const { heatCapacity: Cp } = this.fluid.data
    const massFlowRate = this.massFlowRateCalculation()
    return (
      massFlowRate *
      Cp *
      (this.outletTemperatureCalculation() -
        this.boundaryConditions.initialTemperature)
    )
  }

  public outletEnthalpyCalculation(): number {
    return this.fluid.enthalpyCalculation(
      this.outletTemperatureCalculation(),
      this.outletPressureCalculation()
    )
  }

  public outletEntropyCalculation(): number {
    return this.fluid.entropyCalculation(
      this.outletTemperatureCalculation(),
      this.outletPressureCalculation()
    )
  }
}
