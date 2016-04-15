// This script solves the Airy equation
// d2y/dx2 = xy
// y[0] = AiryAi[0]
// y'[0] = AiryAi'[0]
// dy/dx = y[1]
// xmax <= x <= x0

// d2y/dx2 = f(x,y,dy/dx)
function f(x, y, dy) {
  var d2y = x * y;
  return d2y
}

var y0       = 0.355028053887817239260063186004183176397979174199177240583, // y[0]  = 0
    dy0      = -0.25881940379280679840518356018920396347909113835493458221, // dy[0] = 0
    x0       = 0,
    xmax     = -250,
    N        = 1000001

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
