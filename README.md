# 2D Equation Plotter with HTML canvas

<!-- ## Formatting a Valid Input

1. White spacing does not matter
2. Paramters passed to functions must be in parentases
3. The multiplication symbol (*) may be omitted between a literal and a variable, or between a literal and a function. In these cases, the literal must preceed the variable or function
- valid: *2x* OR *2(x)*
- invalid: *x(2)* OR *x2* -->

## Overview
This project takes input from the user in the form of a string containing a mathematical expression. The output is a graph plot in the _xy_ plane of the expression set equal to _y_ rendered on an HTML canvas element. The graph contains grid lines and tick marks on each axis to indicate scale. The user can also change the x-min, x-max, y-min, and y-max values that are plotted on the graph. Changes to any input field trigger the canvas to redraw the graph. If the user enters an invalid expression, the graph will not render a plot. The units per tick mark also change if the the user zooms in or out far enough, which keeps the canvas from cluttering the tick marks.

The project currently supports single variable expressions with _x_ as the independent variable. Do not include an equals sign (=) in the expression. Common mathematical constants are also accepted (e.g., _e_ and _pi_). Some trigonometric functions (e.g., _sin_, _cos_, and _tan_) may be included if their arguments are wrapped in parentases. 
