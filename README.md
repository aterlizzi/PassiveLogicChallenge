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
