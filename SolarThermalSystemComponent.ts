class SolarThermalSystemComponent {
  name: string;
  fluidType: string;

  constructor(name: string) {
    this.name = name;
  }
}

class SolarPanel extends SolarThermalSystemComponent {
  constructor(name: string) {
    super(name);
  }
}
