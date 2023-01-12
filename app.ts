import thermodynamicFluidsProperties from "./constants/fluidProps";
import VanDerWaalsEOS from "./EquationOfState";
import { FluidType } from "./types/FluidType";

// Fluid properties for Carbon Dioxide
const carbonDioxideProps =
  thermodynamicFluidsProperties[FluidType.CarbonDioxide];

const eos = new VanDerWaalsEOS(carbonDioxideProps);
