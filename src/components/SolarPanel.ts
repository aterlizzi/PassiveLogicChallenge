import { EquationOfState } from '../EquationOfState'
import SolarThermalSystemComponent from './SolarThermalSystemComponent'

// I'm choosing to treat the solar panel as a "heater", such that it receives heat which heats the fluid. In real world applications, solar panels might additionally compress or pump the fluid.
// Assuming this is a constant pressure step, where inlet and outlet pressures are equal.
export default class SolarPanel extends SolarThermalSystemComponent {
  powerGen: number // W/m^2

  solarSize: number // m^2

  volumetricFlowRate: number // L/s

  residenceTime: number // seconds

  constructor(
    eos: EquationOfState,
    powerGen: number,
    solarSize: number,
    volumetricFlowRate: number,
    residenceTime: number,
    inletTemperature: number,
    volume: number
  ) {
    const name = 'SolarPanel'
    super(name, eos, volume, inletTemperature)
    this.powerGen = powerGen
    this.solarSize = solarSize
    this.volumetricFlowRate = volumetricFlowRate
    this.residenceTime = residenceTime
  }

  private heatInputCalculation() {
    const heatInput = this.solarSize * this.powerGen // J/s or W
    return (heatInput / 1000) * this.residenceTime // kJ
  }

  private massFlowRateCalculation() {
    const { density } = this.eos.fluidProps
    const kgPerSecond = (this.volumetricFlowRate / 1000) * density
    return kgPerSecond
  }

  public outletTemperatureCalculation(): number {
    const heatInput = this.heatInputCalculation()
    const { heatCapacity: Cp } = this.eos.fluidProps
    const totalMass = this.massFlowRateCalculation() * this.residenceTime // Kg
    const outletTemperature =
      heatInput / (totalMass * Cp) + this.inletTemperature
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
