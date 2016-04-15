////////////////////////////////////////////////////////////////////////////////
////// Radial wave equation http://math.stackexchange.com/a/1322104/50221 //////
////////////////////////////////////////////////////////////////////////////////

// Import RK4-2nd
var FUNCT = require('../../lib/RK4/2nd.js');

function f(x, y, dy) {
  var d2y = - (2*dy)/x - y + (2*y)/(x*x)
  return d2y
}

var y0       = 1, // y[0]
    dy0      = 0, // dy/dx |x=0
    x0       = 0.01,
    x1       = 1000,
    N        = 1000001;

FUNCT.RK4(x0, x1, y0, dy0, N, f)
