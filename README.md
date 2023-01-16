# Solar Thermal Heating System Simulation

This is a simplified thermodynamic simulation of a solar panel to storage tank heating system. It uses van der Waals equation of state for thermodynamic calculations. Several key assumptions are made, these assumptions are stated above the function in which they are used. In general however, they are:

## Assumptions

1. Liquids are incompressible
2. Steady state
3. Key constants are independent of temperature and pressure.

## Code Approach

A object-orientated approach was used for simulation. Components, or the solar panel, pipes, pump, and tank in the cycle, all adhere to a base class where some common methods and parameters exist. This makes making more components in the future, easier. Component creation itself is handled through a ComponentFactory class that validates the input and handles the creation of each component outlined in the user input.

To support various types of working fluids-Liquids, Vapors, and possibly Mixtures, a base Fluid class is created. From there, various phases inherit from this base class with modified methods depending on the phase.

Some equations of states are more equipped for different working fluids. To support the use of various models, a base EquationOfState class can be inherited from to quickly create new models for thermodynamic approximations.

## Future Implementations

In the future, this could be changed to support a frontend that allows the user to create there own cycles from various components (Solar Panel, etc.). By simplying implementing different components, some user input validation, and new equation of states and working fluid types, you could make something of value.

## Result

The result from the default input is as follows:

------------ SolarPanel -----------
{
outputPressure: '1 bar',
outputTemperature: '310.7489929829241 K',
outputEnthalpy: '2.285621643288428 kJ/mol',
outputEntropy: '0.01209789065511929 kJ/mol-K'
}
------------ Pipe -----------
{
outputPressure: '0.9999987160096088 bar',
outputTemperature: '310.23650886404454 K',
outputEnthalpy: '2.283892034859621 kJ/mol',
outputEntropy: '0.012093694066134048 kJ/mol-K'
}
------------ Pump -----------
{
outputPressure: '2.9999987160096087 bar',
outputTemperature: '310.23650886404454 K',
outputEnthalpy: '2.283892034859621 kJ/mol',
outputEntropy: '0.012093694066134048 kJ/mol-K'
}
------------ Pipe -----------
{
outputPressure: '2.999997945615374 bar',
outputTemperature: '309.9497558751196 K',
outputEnthalpy: '2.282924342673093 kJ/mol',
outputEntropy: '0.012091343174238054 kJ/mol-K'
}
------------ Pipe -----------
{
outputPressure: '2.9999958912307476 bar',
outputTemperature: '309.21602351745855 K',
outputEnthalpy: '2.280448526764741 kJ/mol',
outputEntropy: '0.012085318782376812 kJ/mol-K'
}
