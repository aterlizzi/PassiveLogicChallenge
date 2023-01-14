import BoundaryConditions from '../types/BoundaryConditions'
import Fluid from './Fluid'

export default abstract class SolarThermalSystemComponent {
  name: string

  fluid: Fluid

  boundaryConditions: BoundaryConditions

  constructor(
    name: string,
    fluid: Fluid,
    boundaryConditions: BoundaryConditions
  ) {
    this.name = name
    this.fluid = fluid
    this.boundaryConditions = boundaryConditions
  }

  // public outletTemperatureCalculation() {
  //   const outletEnthalpy = this.outletEnthalpyCalculation()
  //   const outletTemp = bisection(
  //     this.eos.enthalpyCalculation.bind(this.eos),
  //     outletEnthalpy,
  //     10000,
  //     0,
  //     0.001,
  //     10000,
  //     this.volume
  //   )
  //   return outletTemp
  // }

  // public outletEntropyCalculation() {
  //   const outletTemperature = this.outletTemperatureCalculation()
  //   const outletEntropy = this.eos.entropyCalculation(
  //     outletTemperature,
  //     this.volume
  //   )
  //   return outletEntropy
  // }

  // public inletEnthalpyCalculation() {
  //   const inletEnthalpy = this.eos.enthalpyCalculation(
  //     this.inletTemperature,
  //     this.volume
  //   )
  //   return inletEnthalpy
  // }
}
