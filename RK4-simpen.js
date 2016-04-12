// This script was partly copied from the Rosetta Code Runge-Kutta Method article
// (https://rosettacode.org/wiki/Runge-Kutta_method#JavaScript). It uses the RK4
// method to solve the 2nd-order ODE d2y/dx2=-9.8cos(y), which has no known exact
// solution.
// y[0] = 0
// y'[0] = 0
// dy/dx = y[1]
// d2y/dx2 = -9.8 cos(y[0])
// 0 <= x <= 10

var gnuplot = require('gnu-plot'); // Requires the gnu-plot Node.js module

// This function computes y and dy using RK4
function rk4(x, dx, y, dy, f) {
    var l1 = dx * f(x, y, dy),
        k1 = dx * dy,
        l2 = dx * f(x + dx / 2.0,   +y + k1 / 2.0,  +dy + l1 / 2.0),
        k2 = dx * (dy + l1 / 2.0),
        l3 = dx * f(x + dx / 2.0,   +y + k2 / 2.0,  +dy + l2 / 2.0),
        k3 = dx * (dy + l2 / 2.0),
        l4 = dx * f(x + dx,         +y + k3,        +dy + l3),
        k4 = dx * (dy + l3)
    return [y + (k1 + 2.0 * k2 + 2.0 * k3 + k4) / 6.0, dy + (l1 + 2.0 * l2 + 2.0 * l3 + l4) / 6.0];
}

// d2y/dx2 = f(x,y,dy/dx)
function f(x, y, dy) {
    return -9.8*Math.cos(y);
}

var y        = 0.0, // y[0]  = 0
    dy       = 0.0, // dy[0] = 0
    x        = 0.0, // x0    = 0
    xmax     = 10,  // x1    = 10
    maxSteps = 1000001, // steps
    step     = xmax / maxSteps,
    steps    = 0,
    X        = constructor(maxSteps - 1),
    Y        = constructor(maxSteps - 1),
    dY       = constructor(maxSteps - 1)

while (steps < maxSteps) {

    y         = rk4(x, step, y, dy, f)[0];
    dy        = rk4(x, step, y, dy, f)[1];
    Y[steps]  = y
    dY[steps] = dy
    // using integer math for the step addition
    // to prevent floating point errors as 0.2 + 0.1 != 0.3
    x         = ((x * 10) + (step * 10)) / 10;
    X[steps]  = x
    steps    += 1;
}

var Yarr  = Object.keys(Y).map(function (key) {return [X[key], Y[key]]}); // inspired by http://stackoverflow.com/a/26166303/1876983
var dYarr = Object.keys(dY).map(function (key) {return [X[key], dY[key]]}); // inspired by http://stackoverflow.com/a/26166303/1876983
var Parr  = Object.keys(Y).map(function (key) {return [Y[key], dY[key]]}); // inspired by http://stackoverflow.com/a/26166303/1876983

console.log(X[0])

gnuplot(0).plot([{
    title:"y[x] vs. x",
    style:"lines",
    color:"#F0F",
    data:Yarr
}]);

gnuplot(1).plot([{
    title:"dy[x] vs. x",
    style:"lines",
    color:"#F0F",
    data:dYarr
}]);

gnuplot(2).plot([{
    title:"dy[x] vs. y[x]",
    style:"lines",
    color:"#F0F",
    data:Parr
}]);
