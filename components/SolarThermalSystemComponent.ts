import { EquationOfState } from "../EquationOfState";

export default class SolarThermalSystemComponent {
  name: string;
  temperatureInlet: number;
  temperatureOutlet: number;
  eos: EquationOfState;

  constructor(name: string, eos: EquationOfState) {
    this.name = name;
    this.eos = eos;
  }
}
