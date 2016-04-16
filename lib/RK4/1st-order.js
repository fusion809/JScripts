// First-order ODE solver.

exports.RK4 = function(x0, x1, y0, N, f, opt, plt) {
  var gnuplot = require('gnu-plot'); // Requires the gnu-plot Node.js module

  // This function computes y using RK4
  function rk4(x, dx, y, f, opt) {
    var k1 = dx * f(x, y, opt),
        k2 = dx * f(x + dx / 2.0,   +y + k1 / 2.0,  opt),
        k3 = dx * f(x + dx / 2.0,   +y + k2 / 2.0,  opt),
        k4 = dx * f(x + dx,         +y + k3,        opt)
    return y + (k1 + 2.0 * k2 + 2.0 * k3 + k4) / 6.0;
  }

  var y        = y0,
      x        = x0,
      xmax     = x1,
      h        = xmax / N,
      i        = 0,
      X        = constructor(N),
      Y        = constructor(N)

  while (i < N) {
      y           = rk4(x, h, y, f, opt);
      Y[i+1]      = y;
      x           = x + h;
      X[i+1]      = x;
      i          += 1;
  }

  X[0]     = x0,
  Y[0]     = y0

  var Yarr  = Object.keys(Y).map(function (key) {return [X[key], Y[key]]}); // inspired by http://stackoverflow.com/a/26166303/1876983

  console.log(X[0])
  console.log(Y[N])

  function plot() {
    gnuplot(0).plot([{
        title:"y[x] vs. x",
        style:"lines",
        color:"#F0F",
        data:Yarr
    }]);
  }

  if ( plt == 'true' ) {
    plot()
  } else if ( plt == 'True' ) {
    plot()
  }
  this.getX = function() {
    return X
  }
}
