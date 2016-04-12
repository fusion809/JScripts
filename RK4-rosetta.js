// This script was partly copied from the Rosetta Code Runge-Kutta Method article
// (https://rosettacode.org/wiki/Runge-Kutta_method#JavaScript). It uses the RK4
// method to solve the first-order ODE dy/dx=-y, which has the exact solution
// y = e^(-x) on 0 < x < 10
// y[0] = 1
var gnuplot = require('gnu-plot');

function rk4(y, x, dx, f) {
    var k1 = dx * f(x, y),
        k2 = dx * f(x + dx / 2.0,   +y + k1 / 2.0),
        k3 = dx * f(x + dx / 2.0,   +y + k2 / 2.0),
        k4 = dx * f(x + dx,         +y + k3);

    return y + (k1 + 2.0 * k2 + 2.0 * k3 + k4) / 6.0;
}

function f(x, y) {
    return -y;
}

function actual(x) {
    return Math.exp(-x);
}

var y = 1.0,
    x = 0.0,
    ymax = 10,
    maxSteps = 100001,
    step = ymax / maxSteps,
    diff = 0,
    yex = 0,
    err2 = 0,
    err = 0,
    steps = 0,
    X = constructor(maxSteps - 1),
    Y = constructor(maxSteps - 1),
    sampleEveryN = 10;

while (steps < maxSteps) {

    y = rk4(y, x, step, f);
    yex = actual(x);
    diff = yex - y
    err2 = err2 + (diff * diff)/(maxSteps - 1)
    Y[steps] = y

    // using integer math for the step addition
    // to prevent floating point errors as 0.2 + 0.1 != 0.3
    x = ((x * 10) + (step * 10)) / 10;
    X[steps] = x
    steps += 1;
}

err = Math.sqrt(err2);

var arr = Object.keys(Y).map(function (key) {return [X[key], Y[key]]});
console.log(err)
console.log(diff)
gnuplot().plot([{
    title:"data3",
    style:"lines",
    color:"#00FF00",
    data:arr
}]);
