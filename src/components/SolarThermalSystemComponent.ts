import BoundaryConditions from '../types/BoundaryConditions'
import Fluid from './Fluid'

export default abstract class SolarThermalSystemComponent {
  name: string

  fluid: Fluid

  boundaryConditions: BoundaryConditions

  abstract outletPressureCalculation(): number
  abstract outletTemperatureCalculation(): number

  constructor(
    name: string,
    fluid: Fluid,
    boundaryConditions: BoundaryConditions
  ) {
    this.name = name
    this.fluid = fluid
    this.boundaryConditions = boundaryConditions
  }
}
