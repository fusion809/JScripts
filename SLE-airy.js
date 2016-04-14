var gnuplot = require('gnu-plot'),
    math    = require('mathjs'),
    N       = 1000,
    n       = math.range(0,N+1,1),
    nT      = math.transpose(n),
    x       = math.cos(math.acos(math.pi*nT/N)*n);

console.log(nT)
