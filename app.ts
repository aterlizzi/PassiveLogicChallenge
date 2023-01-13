import Pipe from "./components/PIpe";
import thermodynamicFluidsProperties from "./constants/fluidProps";
import VanDerWaalsEOS from "./EquationOfState";
import { FluidType } from "./types/FluidType";
import pipeProps from "./constants/pipeProps";
import SolarPanel from "./components/SolarPanel";
import HeatTransferProperties from "./types/HeatTransferProperties";
import Pump from "./components/Pump";
import StorageTank from "./components/StorageTank";

// Constants
// Fluid properties for Carbon Dioxide
const carbonDioxideProps = thermodynamicFluidsProperties[FluidType.Water];
const avgVelocity = 1.5; // m/s
const solarInletTemp = 45; // C
const solarInletPressure = 20; // kPa
const solarPanelSize = 1; // m^2
const solarPowerGen = 156; // W/m^2
const volume = 1; // m^3
const workInput = 5; // kJ/kg
const pumpEfficiency = 0.75;
const heatTransferProps: HeatTransferProperties = {
  innerSurfaceTemperature: 45, // C
  heatTransferCoefficient: 11.3, //
};
const heatTransferToSurroundings = 100;

// Define Equation of State to be used in approximations of thermodynamic properties.
const eos = new VanDerWaalsEOS(carbonDioxideProps);

// Cycle: SolarPanel -> Pipe -> Pump -> Pipe -> StorageTank -> Pipe -> SolarPanel
const solarPanel = new SolarPanel(
  eos,
  solarPanelSize,
  solarPowerGen,
  solarInletTemp,
  solarInletPressure,
  volume
);
const solarOutletPressure = solarInletPressure;
const solarOutletTemp = solarPanel.outletTemperatureCalculation();
const pipeOne = new Pipe(
  eos,
  pipeProps,
  heatTransferProps,
  avgVelocity,
  volume,
  solarOutletPressure,
  solarOutletTemp
);
const pipeOneOutletPressure = pipeOne.outletPressureCalculation();
const pipeOneOutletTemp = pipeOne.outletTemperatureCalculation();
const pump = new Pump(
  eos,
  workInput,
  pumpEfficiency,
  volume,
  pipeOneOutletPressure,
  pipeOneOutletTemp
);
const pumpOutletPressure = pump.outletPressureCalculation();
const pumpOutletTemp = pump.outletTemperatureCalculation();
const tank = new StorageTank(
  eos,
  heatTransferToSurroundings,
  volume,
  pumpOutletTemp
);
const tankOutletTemp = tank.outletTemperatureCalculation();
const pipeTwo = new Pipe(
  eos,
  pipeProps,
  heatTransferProps,
  avgVelocity,
  volume,
  pumpOutletPressure,
  tankOutletTemp
);
