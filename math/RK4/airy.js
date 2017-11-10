// This script solves the Airy equation
// d2y/dx2 = xy
// y[0] = AiryAi[0]
// y'[0] = AiryAi'[0]
// dy/dx = y[1]
// xmax <= x <= x0

// Import RK4 2nd order library
var FUNCT = require('../../lib/RK4/2nd-order.js');

// d2y/dx2 = f(x,y,dy/dx)
function f(x, y, dy) {
  var d2y = x * y;
  return d2y
}

var y0       = 0.355028053887817239260063186004183176397979174199177240583, // y[0]  = 0
    dy0      = -0.25881940379280679840518356018920396347909113835493458221, // dy[0] = 0
    x0       = 0,
    x1       = -250,
    N        = 1000001


FUNCT.RK4(x0, x1, y0, dy0, N, f, 'airy.log')
