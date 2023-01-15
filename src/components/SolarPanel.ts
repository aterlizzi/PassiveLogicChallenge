import BoundaryConditions from '../types/BoundaryConditions'
import { SolarProperties } from '../types/SolarProperties'
import Fluid from './Fluid'
import SolarThermalSystemComponent from './SolarThermalSystemComponent'

// I'm choosing to treat the solar panel as a "heater", such that it receives heat which heats the fluid. In real world applications, solar panels might additionally compress or pump the fluid.
// Assuming this is a constant pressure step, where inlet and outlet pressures are equal.
export default class SolarPanel extends SolarThermalSystemComponent {
  solarProps: SolarProperties

  constructor(
    fluid: Fluid,
    solarProperties: SolarProperties,
    boundaryConditions: BoundaryConditions
  ) {
    const name = 'SolarPanel'
    super(name, fluid, boundaryConditions)
    this.solarProps = solarProperties

    // Initialize volume for Liquid Systems, since we assume they do not change (incompressible)
    this.fluid.getVolume(
      boundaryConditions.initialTemperature,
      boundaryConditions.initialPressure
    )
  }

  private heatInputCalculation() {
    const heatInput = this.solarProps.solarSize * this.solarProps.powerGen // J/s or W
    return heatInput / 1000 // kJ/s
  }

  private massFlowRateCalculation() {
    const density = this.fluid.getDensity(
      this.boundaryConditions.initialTemperature,
      this.boundaryConditions.initialPressure
    )
    return (this.fluid.volumetricFlowRate / 1000) * density
  }

  public outletTemperatureCalculation(): number {
    const heatInput = this.heatInputCalculation()
    const { heatCapacity: Cp } = this.fluid.data
    const massFlowRate = this.massFlowRateCalculation() // Kg/s
    return (
      heatInput / (massFlowRate * Cp) +
      this.boundaryConditions.initialTemperature
    )
  }

  // We assume this is a constant pressure step
  public outletPressureCalculation(): number {
    return this.boundaryConditions.initialPressure
  }

  public outletEntropyCalculation(): number {
    const outletTemp = this.outletTemperatureCalculation()
    const outletPressure = this.outletPressureCalculation()
    return this.fluid.entropyCalculation(outletTemp, outletPressure)
  }

  public outletEnthalpyCalculation(): number {
    const outletTemp = this.outletTemperatureCalculation()
    const outletPressure = this.outletPressureCalculation()
    return this.fluid.enthalpyCalculation(outletTemp, outletPressure)
  }
}
