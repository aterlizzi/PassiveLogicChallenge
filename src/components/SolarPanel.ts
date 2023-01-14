import BoundaryConditions from '../types/BoundaryConditions'
import { SolarProperties } from '../types/SolarProps'
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
  }

  private heatInputCalculation() {
    const heatInput = this.solarProps.solarSize * this.solarProps.powerGen // J/s or W
    return (heatInput / 1000) * this.solarProps.residenceTime // kJ
  }

  private massFlowRateCalculation() {
    const { density } = this.fluid.data
    const kgPerSecond = (this.fluid.volumetricFlowRate / 1000) * density
    return kgPerSecond
  }

  public outletTemperatureCalculation(): number {
    const heatInput = this.heatInputCalculation()
    const { heatCapacity: Cp } = this.fluid.data
    const totalMass =
      this.massFlowRateCalculation() * this.solarProps.residenceTime // Kg
    const outletTemperature =
      heatInput / (totalMass * Cp) + this.boundaryConditions.initialTemperature
    return outletTemperature
  }

  // public outletEnthalpyCalculation() {
  //   const molarFlowRate = this.volumetricFlowRateToMol()
  //   const inletEnthalpy = this.inletEnthalpyCalculation() * molarFlowRate // kJ/mol * mol/s = kJ/s
  //   const totalHeatInput = this.totalPowerGenerationCalculation()
  //   const outletEnthalpy = totalHeatInput + inletEnthalpy
  //   return outletEnthalpy
  // }
}
