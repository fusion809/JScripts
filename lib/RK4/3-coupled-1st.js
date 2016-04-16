// Second-order ODE solver.

exports.RK4 = function(t0, x0, y0, z0, N, f, opt, plt) {
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
