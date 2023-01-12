class SolarThermalSystemComponent {
  name: string;
  heatLossToSurroundings: number;

  constructor(name: string, heatLossToSurroundings: number) {
    this.name = name;
    this.heatLossToSurroundings = heatLossToSurroundings;
  }
}

class SolarPanel extends SolarThermalSystemComponent {
  heatInputFromSun: number;

  constructor(heatLossToSurroundings: number, heatInputFromSun: number) {
    const name = "SolarPanel";
    super(name, heatLossToSurroundings);
    this.heatInputFromSun = heatInputFromSun;
  }
}

class Pump extends SolarThermalSystemComponent {
  workInput: number;

  constructor(heatLossToSurroundings: number, workInput: number) {
    const name = "Pump";
    super(name, heatLossToSurroundings);
    this.workInput = workInput;
  }
}

class StorageTank extends SolarThermalSystemComponent {
  constructor(heatLossToSurroundings: number) {
    const name = "StorageTank";
    super(name, heatLossToSurroundings);
  }
}
