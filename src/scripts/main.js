// graph supports parameter animation with paramT
const equationField = document.getElementById('equation-field');
const canvas = document.getElementById('graph-window');
const ctx = canvas.getContext('2d');

// variables for math parsing 
let expression = '';
let scope = {
    x: 0,
    t: 0
}

let paramT = 0;
let paramIncrement = 0.1;

// number of line segments
const n = 1000;

// graph window
let xMin = -10, xMax = 10, yMin = -10, yMax = 10;

initExprFromHash();
plot();
// animate();

// listen for changes to text input field 

equationField.value = expression;
equationField.addEventListener('keyup', event => {
    expression = equationField.value;
    setHashFromExpr();
    plot();
});

// update from back and forward buttons
window.addEventListener('hashchange', initExprFromHash);

function plot() {
    let xPixel, yPixel;
    // these vary between 0 and 1, with a step defined by n
    let percentX, percentY;
    // math space coordinates, vary between min and max of graph window
    let mathX, mathY;
    
    // clear the canvas
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.beginPath();
    for (let i = 0; i < n; i++) {
        percentX = i / (n - 1);
        // mathX varies between xMin and xMax
        mathX = percentX * (xMax - xMin) + xMin;
        
        // define mathY in terms of mathX
        mathY = func(mathX);
        percentY = (mathY - yMin) / (yMax - yMin);
        
        // transform coordinate so origin is in the bottom left
        percentY = 1 - percentY;
        
        xPixel = percentX * canvas.width;
        yPixel = percentY * canvas.height;
        
        ctx.lineTo(xPixel,yPixel);
    }
    ctx.stroke();
}

// return the y coordinate in the math space of the given argument number
function func(arg) {
    scope.x = arg;
    scope.t = paramT;
    return math.evaluate(expression, scope);
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    // increment paramter t
    paramT += paramIncrement;
    // redraw
    plot();
}

// save equation 

// get hash string from locator
function getHash() {
    return location.hash.substr(1);
}

// set hash value of locator
function setHash(val) {
    location.hash = val;
}

function setHashFromExpr() {
    setHash(expression);
}

function initExprFromHash() {
    let hash = getHash();
    // if no hash
    if (hash) {
        expression = hash;
    } else {
        expression = 'sin(x)';
        setHashFromExpr();
    }
    equationField.value = expression;
    plot();
}