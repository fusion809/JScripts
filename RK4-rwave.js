////////////////////////////////////////////////////////////////////////////////
////////////// This section is borrowed from lib/RK4-2nd.js ////////////////////
////////////////////////////////////////////////////////////////////////////////

function RK4(x0, x1, y0, dy0, N, f) {
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

  var y        = y0,
      dy       = dy0,
      x        = x0,
      xmax     = x1,
      h        = xmax / N,
      i        = 0,
      X        = constructor(N),
      Y        = constructor(N),
      dY       = constructor(N)

  while (i < N) {
      y           = rk4(x, h, y, dy, f)[0];
      dy          = rk4(x, h, y, dy, f)[1];
      Y[i+1]      = y;
      dY[i+1]     = dy;
      x           = x + h;
      X[i+1]      = x;
      i          += 1;
  }

  X[0]     = x0,
  Y[0]     = y0,
  dY[0]    = dy0

  var Yarr  = Object.keys(Y).map(function (key) {return [X[key], Y[key]]}); // inspired by http://stackoverflow.com/a/26166303/1876983
  var dYarr = Object.keys(dY).map(function (key) {return [X[key], dY[key]]}); // inspired by http://stackoverflow.com/a/26166303/1876983
  var Parr  = Object.keys(Y).map(function (key) {return [Y[key], dY[key]]}); // inspired by http://stackoverflow.com/a/26166303/1876983

  console.log(X[0])
  console.log(Y[N])

  function plot() {
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
  }

  plot()
}

////////////////////////////////////////////////////////////////////////////////
////// Radial wave equation http://math.stackexchange.com/a/1322104/50221 //////
////////////////////////////////////////////////////////////////////////////////

function f(x, y, dy) {
  var d2y = - (2*dy)/x - y + (2*y)/(x*x)
  return d2y
}

var y0       = 1, // y[0]
    dy0      = 0, // dy/dx |x=0
    x0       = 0.01,
    x1       = 1000,
    N        = 1000001;

RK4(x0, x1, y0, dy0, N, f)
