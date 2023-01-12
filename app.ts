import { PipeProperties } from "./types/PipeProperties";
import Pipe from "./components/PIpe";
import { Pump } from "./components/Pump";
import thermodynamicFluidsProperties from "./constants/fluidProps";
import VanDerWaalsEOS from "./EquationOfState";
import { FluidType } from "./types/FluidType";
import pipeProps from "./constants/pipeProps";

// Constants
// Fluid properties for Carbon Dioxide
const carbonDioxideProps = thermodynamicFluidsProperties[FluidType.Water];
const avgVelocity = 1.5; // m/s

// Define Equation of State to be used in approximations of thermodynamic properties.
const eos = new VanDerWaalsEOS(carbonDioxideProps);

const pipeOne = new Pipe(eos, pipeProps, avgVelocity);
const pump = new Pump(eos);
