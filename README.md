# JScripts
This repository mostly contains scripts, written in JavaScript (JS), for the purpose of scientific computing. Here there be ODE solvers.

## Structure
This repository's basic structure is:

```bash
.
├── lib
│   ├── lib1.js
│   ├── lib2.js
│   ├── lib3.js
│   ├── ...
│   └── lib(n).js
├── LICENSE
├── math
│   ├── math-program1.js
│   ├── math-program2.js
│   ├── math-program3.js
│   ├── ...
│   └── math-program(n).js
└── README.md
```

Where `lib1` is the name of library number one, `lib2` is the name of library number two, *etc.* Likewise `math-program1` refers to the name of mathematics program number 1, `math-program2` refers to the name of mathematics program number 2, *etc.* Libraries, in this repository, at least, refers to scripts that define important functions used, or likely to be used, by more than one other script.

## Airy Equation
<script src='https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML'></script>

$$ \frac{d^2 y}{dx^2} = xy $$

## How to use these scripts
In order to use these scripts I recommend you have Git, Node.js and NPM installed and run:

```bash
git clone https://github.com/fusion809/JScripts
cd JScripts
npm install gnu-plot mathjs ode-rk4
```

Then when you want to run a script run it using Node.js, that is, use the command:

```bash
node <SCRIPT>.js
```
