import { PipeProperties } from "./../types/PipeProperties";

// Steel sheet pipe properties
const pipeProps: PipeProperties = {
  fanningFrictionFactor: 0.02,
  diameter: 0.3, // meters
  length: 12, // meters
  thermalConductivity: 45, // W/(mK)
  specificHeat: 0.472, // J/g-°C
};

export default pipeProps;
