# 2D Equation Plotter with HTML canvas

<!-- ## Formatting a Valid Input

1. White spacing does not matter
2. Paramters passed to functions must be in parentases
3. The multiplication symbol (*) may be omitted between a literal and a variable, or between a literal and a function. In these cases, the literal must preceed the variable or function
- valid: *2x* OR *2(x)*
- invalid: *x(2)* OR *x2* -->

## Overview
This project takes input from the user in the form of a string containing a mathematical equation. The output is a graph plot of the equation rendered on an HTML canvas element. The graph contains grid lines and tick marks on each axis to indicate scale. The user can also change the x-min, x-max, y-min, and y-max values that are plotted on the graph. Changes to any input field trigger the canvas to redraw the graph. The units per tick mark also change if the the user zooms in or out far enough, which keeps the canvas from cluttering the tick marks.

The project currently supports single variable equations with _x_ as the independent variable. Common mathematical constants are also accepted (e.g., _e_ and _pi_). Some trigonometric functions (e.g., _sin_, _cos_, and _tan_) may be included if their arguments are wrapped in parentases. 
