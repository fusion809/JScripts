///////////////////////////////////////////////////////////////////////////////////////////
// Anger diff equation d2y/dx2=-1/x*dy/dx - (1-(v^2)/(x^2))*y + (x-v)/(pi*x^2)*sin(pi*v) //
///////////////////////////////////////////////////////////////////////////////////////////

// Import RK4 2nd order library
var FUNCT = require('../../lib/RK4/2nd.js'),
    math  = require('mathjs');

function f(x, y, dy, opt) {
  var v      = opt[0],
      pi     = math.pi,
      d2y    = -(dy/x) - (1-(v*v)/(x*x))*y + (x-v)/(pi*x*x)*Math.sin(pi*v)
  return d2y
}

var y0       = 1, // y[0]
    dy0      = 0, // dy/dx |x=0
    x0       = 0.01,
    x1       = 1000,
    N        = 1000001,
    opt      = [1]; // v

FUNCT.RK4(x0, x1, y0, dy0, N, f, opt)
