// This script was partly copied from the Rosetta Code Runge-Kutta Method article
// (https://rosettacode.org/wiki/Runge-Kutta_method#JavaScript). It uses the RK4
// method to solve the 2nd-order ODE d2y/dx2=-x*y, which has no known exact
// solution.
// y[0] = AiryAi[0]
// y'[0] = AiryAi'[0]
// dy/dx = y[1]
// d2y/dx2 = xy
// xmax <= x <= x0

var gnuplot = require('gnu-plot'); // Requires the gnu-plot Node.js module

// This function computes y and dy using RK4
function rk4(t, dt, x, y, z, f, opt) {
  // kn is for x, ln for y, mn for z
  var X1 = f(t, x, y, z, opt),
      k1 = dt * X1[0],
      l1 = dt * X1[1],
      m1 = dt * X1[2],
      X2 = f(t + dt / 2.0,        +x + k1 / 2.0,  +y + l1 / 2.0, +z + m1 / 2.0, opt),
      k2 = dt * X2[0],
      l2 = dt * X2[1],
      m2 = dt * X2[2],
      X3 = f(t + dt / 2.0,        +x + k2 / 2.0,  +y + l2 / 2.0, +z + m2 / 2.0, opt)
      k3 = dt * X3[0],
      l3 = dt * X3[1],
      m3 = dt * X3[2],
      X4 = f(t + dt / 2.0,        +x + k1,        +y + l3,       +z + m1,       opt),
      k4 = dt * X4[0],
      l4 = dt * X4[1],
      m4 = dt * X4[2]
  return [x + (k1 + 2.0 * k2 + 2.0 * k3 + k4) / 6.0, y + (l1 + 2.0 * l2 + 2.0 * l3 + l4) / 6.0, z + (m1 + 2.0 * m2 + 2.0 * m3 + m4) / 6.0];
}

// dX/dt=f(t, X, opt)
function f(t, x, y, z, opt) {
  var sigma = opt[0],
      r     = opt[1],
      b     = opt[2],
      dx    = sigma*(y-x),
      dy    = -x*z+r*x-y,
      dz    = x*y - b*z
  return [dx, dy, dz]
}

var x0       = 1,
    x        = x0,
    y0       = 1,
    y        = y0,
    z0       = 1,
    z        = z0,
    t        = 0,
    tmax     = 1000,
    sigma    = 10,
    r        = 28,
    b        = 8 / 3.0,
    opt      = [sigma, r, b],
    N        = 1000001, // steps
    h        = tmax / N,
    i        = 0,
    X        = constructor(N),
    Y        = constructor(N),
    Z        = constructor(N),
    T        = constructor(N)

while (i < N) {
    x           = rk4(t, h, x, y, z, f, opt)[0];
    y           = rk4(t, h, x, y, z, f, opt)[1];
    z           = rk4(t, h, x, y, z, f, opt)[2];
    X[i+1]      = x;
    Y[i+1]      = y;
    Z[i+1]      = z;
    t           = t + h;
    T[i+1]      = t;
    i          += 1;
}

X[0]     = x0,
Y[0]     = y0,
Z[0]     = z0

var SOL   = Object.keys(X).map(function (key) {return [X[key], Y[key], Z[key]]}); // inspired by http://stackoverflow.com/a/26166303/1876983

console.log(X[0])
console.log(Y[N])

function plot() {
  gnuplot(0).splot([{
      title:"Lorenz attractor",
      style:"lines",
      color:"#F0F",
      data:SOL
  }]);
}

plot()
