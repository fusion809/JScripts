var rk4 = require('ode-rk4')
var gnuplot = require('gnu-plot');

var deriv = function(dydt, y, t) {
    dydt[0] = -y[1]
    dydt[1] =  y[0]
}

var y0 = [1,0]
var n = 1000
var t0 = 0
var dt = 2.0 * Math.PI / n
var t = t0 + dt * n
var K = constructor(n)
var T = constructor(n)
var integrator = rk4( y0, deriv, t0, dt )

// Integrate 1000 steps:
for (var i = 0; i<n; i++) {
  K[i]=integrator.steps(i).y[1]
  T[i]=t0 + dt*i
}

var YVarr=K
var arr = Object.keys(K).map(function (key) {return [key,K[key]]});
console.log(arr)
gnuplot().plot([{
    title:"data3",
    style:"lines",
    color:"#00FF00",
    data:arr
}]);
