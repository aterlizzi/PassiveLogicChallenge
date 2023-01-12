import { PipeProperties } from "./types/PipeProperties";
import Pipe from "./components/PIpe";
import { Pump } from "./components/Pump";
import thermodynamicFluidsProperties from "./constants/fluidProps";
import VanDerWaalsEOS from "./EquationOfState";
import { FluidType } from "./types/FluidType";
import pipeProps from "./constants/pipeProps";
import SolarPanel from "./components/SolarPanel";

// Constants
// Fluid properties for Carbon Dioxide
const carbonDioxideProps = thermodynamicFluidsProperties[FluidType.Water];
const avgVelocity = 1.5; // m/s
const solarInletTemp = 45; // C
const solarInletPressure = 20; // kPa
const solarPanelSize = 1; // m^2
const solarPowerGen = 156; // W/m^2
const volume = 1; // m^3
const innerSurfaceTemperature = 45; // C
const heatTransferCoefficient = 11.3; // (W/(m2 K))

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
const solarOutputPressure = solarInletPressure;
const solarOutletTemp = solarPanel.outletTemperatureCalculation();
const pipeOne = new Pipe(
  eos,
  pipeProps,
  avgVelocity,
  solarOutputPressure,
  solarOutletTemp,
  innerSurfaceTemperature,
  heatTransferCoefficient
);
