import { EquationOfState } from "./EquationOfState";

class SolarThermalSystemComponent {
  name: string;
  temperatureInlet: number;
  temperatureOutlet: number;
  eos: EquationOfState;

  constructor(name: string, eos: EquationOfState) {
    this.name = name;
    this.eos = eos;
  }
}

class SolarPanel extends SolarThermalSystemComponent {
  heatInputFromSun: number;

  constructor(eos: EquationOfState, heatInputFromSun: number) {
    const name = "SolarPanel";
    super(name, eos);
    this.heatInputFromSun = heatInputFromSun;
  }
}

// Known volume, since liquids are approximately incompressible.
// Known inlet temp
// Known inlet pressure
// Calc outlet pressure
// Calc outlet temp
// Calc enthalpy
// Calc entropy
class Pump extends SolarThermalSystemComponent {
  workInput: number;
  pumpEfficiency: number;
  volume: number;
  inletPressure: number;
  inletTemperature: number;

  constructor(
    eos: EquationOfState,
    workInput: number,
    pumpEfficiency: number,
    volume: number,
    inletPressure: number,
    inletTemperature: number
  ) {
    const name = "Pump";
    super(name, eos);
    this.workInput = workInput;
    this.pumpEfficiency = pumpEfficiency;
    this.volume = volume;
    this.inletPressure = inletPressure;
    this.inletTemperature = inletTemperature;
  }

  private idealWorkCalculation() {
    const idealWork = this.workInput * this.pumpEfficiency;
    return idealWork;
  }

  public outletPressureCalculation() {
    const idealWork = this.idealWorkCalculation();
    const delPressure = idealWork / this.volume;
    const outletPressure = delPressure + this.inletPressure;
    return outletPressure;
  }

  public inletEnthalpyCalculation() {
    const inletEnthalpy = this.eos.enthalpyCalculation(
      this.inletTemperature,
      this.volume
    );
    return inletEnthalpy;
  }

  public outletEnthalpyCalculation() {
    const inletEnthalpy = this.inletEnthalpyCalculation();
    const outletEnthalpy = this.workInput + inletEnthalpy;
    return outletEnthalpy;
  }

  public inletEntropyCalculation() {
    const inletEntropy = this.eos.entropyCalculation(
      this.inletTemperature,
      this.volume
    );
    return inletEntropy;
  }

  public outletEntropyCalculation() {}
}

class StorageTank extends SolarThermalSystemComponent {
  heatLossToSurroundings: number;

  constructor(eos: EquationOfState, heatLossToSurroundings: number) {
    const name = "StorageTank";
    super(name, eos);
    this.heatLossToSurroundings = heatLossToSurroundings;
  }
}
