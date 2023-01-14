import ComponentLackingSetupError from '../errors/factory'
import NoGaseousPumpsError from '../errors/pump'
import BoundaryConditions from '../types/BoundaryConditions'
import { PipeProperties } from '../types/PipeProperties'
import { PumpProperties } from '../types/PumpProps'
import { SolarProperties } from '../types/SolarProperties'
import { StorageTankProperties } from '../types/StorageTankProps'
import Fluid, { Gas } from './Fluid'
import Pipe from './Pipe'
import Pump from './Pump'
import SolarPanel from './SolarPanel'
import StorageTank from './StorageTank'

export default class ComponentFactory {
  static createComponent(
    component: string,
    fluid: Fluid,
    data:
      | PumpProperties
      | StorageTankProperties
      | SolarProperties
      | PipeProperties,
    boundaryConditions: BoundaryConditions
  ) {
    switch (component) {
      case 'SolarPanel':
        return new SolarPanel(
          fluid,
          data as SolarProperties,
          boundaryConditions
        )
      case 'Pipe':
        return new Pipe(fluid, data as PipeProperties, boundaryConditions)
      case 'Pump':
        if (fluid instanceof Gas) throw new NoGaseousPumpsError()
        return new Pump(fluid, data as PumpProperties, boundaryConditions)
      case 'StorageTank':
        return new StorageTank(
          fluid,
          data as StorageTankProperties,
          boundaryConditions
        )
      default:
        throw new ComponentLackingSetupError(component)
    }
  }
}
