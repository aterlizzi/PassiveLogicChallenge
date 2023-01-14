import Fluid from '../components/Fluid'
import BoundaryConditions from './BoundaryConditions'
import { PipeProperties } from './PipeProperties'
import { PumpProperties } from './PumpProps'
import { SolarProperties } from './SolarProperties'
import { StorageTankProperties } from './StorageTankProps'

export interface UserInput {
  components: ComponentData[]
  fluid: Fluid
  boundaryConditions: BoundaryConditions
}

export interface ComponentData {
  component: string
  data:
    | PumpProperties
    | StorageTankProperties
    | SolarProperties
    | PipeProperties
}
