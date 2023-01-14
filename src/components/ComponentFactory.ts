import Fluid from './Fluid'
import Pipe from './Pipe'
import Pump from './Pump'
import SolarPanel from './SolarPanel'
import StorageTank from './StorageTank'

export default class ComponentFactory {
  static createComponent(component: string, fluid: Fluid, data: any) {
    switch (component) {
      case 'SolarPanel':
        return new SolarPanel(fluid, data)
      case 'Pipe':
        return new Pipe(fluid, data)
      case 'Pump':
        return new Pump(fluid, data)
      case 'StorageTank':
        return new StorageTank(fluid, data)
      default:
    }
  }
}
