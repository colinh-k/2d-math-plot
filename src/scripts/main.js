const equationField = document.getElementById('equation-field');
const canvas = document.getElementById('graph-window');
const ctx = canvas.getContext('2d');

// variables for math parsing 
let expression = '';
let scope = {
    x: 0,
}

// number of line segments
const n = 1000;

// graph window
let xMin = -10, xMax = 10, yMin = -10, yMax = 10;

// grid size in px
const gridStep = 55;

// how many lines from canvas origin to place x axis
const xAxisOffset = Math.round(canvas.height / gridStep / 2);
const xAxisStartLabel = 1;

// how many lines from canvas origin to place y axis
const yAxisOffset = Math.round(canvas.width / gridStep / 2);
const yAxisStartLabel = 1;

ctx.translate(yAxisOffset * gridStep, xAxisOffset * gridStep);
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
    
    drawGrid();
    // ctx.translate(yAxisOffset * gridStep, xAxisOffset * gridStep);

    ctx.beginPath();
    // og: for (let i = 0; i < n; i++) {
    for (let i = 0; i < n; i++) {
        percentX = i / (n - 1);
        // mathX varies between xMin and xMax
        mathX = percentX * (xMax - xMin) + xMin;
        
        // define mathY in terms of mathX
        mathY = evaluateFunction(mathX);
        percentY = (mathY - yMin) / (yMax - yMin);
        
        // transform coordinate so origin is in the bottom left
        percentY = 1 - percentY;
        
        xPixel = percentX * canvas.width;
        yPixel = percentY * canvas.height;
        
        ctx.lineTo(xPixel,yPixel);
    }

    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.stroke();
}

// return the y coordinate in the math space of the given argument number
function evaluateFunction(arg) {
    scope.x = arg;
    return math.evaluate(expression, scope);
}

function drawLines() {
    const numVerticalLines = (canvas.width / gridStep);
    const numHorizontalLines = (canvas.height / gridStep);

    ctx.translate(-yAxisOffset * gridStep, -xAxisOffset * gridStep);

    for (let i = 0; i <= numHorizontalLines; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;

        // if line is x axis draw in different color
        ctx.strokeStyle = (i === xAxisOffset) ? 'red' : 'gray';

        if (i === numHorizontalLines) {
            ctx.moveTo(0, gridStep * i);
            ctx.lineTo(canvas.width, gridStep * i);
        } else {
            ctx.moveTo(0, gridStep * i + 0.5);
            ctx.lineTo(canvas.width, gridStep * i + 0.5);
        }

        ctx.stroke();
    }

    for (let i = 0; i <= numVerticalLines; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;

        // if line is x axis draw in different color
        ctx.strokeStyle = (i === yAxisOffset) ? 'red' : 'gray';

        if (i === numVerticalLines) {
            ctx.moveTo(gridStep * i, 0);
            ctx.lineTo(gridStep * i, canvas.height);
        } else {
            ctx.moveTo(gridStep * i + 0.5, 0);
            ctx.lineTo(gridStep * i + 0.5, canvas.height);
        }

        ctx.stroke();
    }

    ctx.translate(yAxisOffset * gridStep, xAxisOffset * gridStep);
}

function drawGrid() {
    const tickMarkWidth = 6;

    const numVerticalLines = (canvas.width / gridStep);
    const numHorizontalLines = (canvas.height / gridStep);

    drawLines();

    // tick marks along positive x axis
    for (let i = 1; i < (numVerticalLines - yAxisOffset); i++) {
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'black';

        ctx.moveTo(gridStep * i + 0.5, -(tickMarkWidth / 2));
        ctx.lineTo(gridStep * i + 0.5, tickMarkWidth / 2);
        ctx.stroke();

        ctx.font = '9px Arial';
        ctx.textAlign = 'start';
        ctx.fillText(xAxisStartLabel * i, gridStep * i - 2, 15);
    }

    for (let i = 1; i < numVerticalLines; i++) {
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'black';

        ctx.moveTo(-gridStep * i + 0.5, -(tickMarkWidth / 2));
        ctx.lineTo(-gridStep * i + 0.5, tickMarkWidth / 2);
        ctx.stroke();

        ctx.font = '9px Arial';
        ctx.textAlign = 'end';
        ctx.fillText(-xAxisStartLabel * i, -gridStep * i + 3, 15);
    }

    // tick marks along positive y axis
    for (let i = 1; i < (numHorizontalLines - xAxisOffset); i++) {
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'black';

        ctx.moveTo(-(tickMarkWidth / 2), gridStep * i + 0.5);
        ctx.lineTo(tickMarkWidth / 2, gridStep * i + 0.5);
        ctx.stroke();

        ctx.font = '9px Arial';
        ctx.textAlign = 'start';
        ctx.fillText(-yAxisStartLabel * i, 8, gridStep * i + 3);
    }

    for (let i = 1; i < numHorizontalLines; i++) {
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'black';

        ctx.moveTo(-(tickMarkWidth / 2), -gridStep * i + 0.5);
        ctx.lineTo(tickMarkWidth / 2, -gridStep * i + 0.5);
        ctx.stroke();

        ctx.font = '9px Arial';
        ctx.textAlign = 'end';
        ctx.fillText(yAxisStartLabel * i, 15, -gridStep * i + 3);
    }

    // ctx.translate(-yAxisOffset * gridStep, -xAxisOffset * gridStep);

    // const xPixelStep = canvas.width / numVerticalLines;
    // const yPixelStep = canvas.height / numHorizontalLines;

    // ctx.beginPath();
    // for (let x = 0; x < canvas.width; x += xPixelStep) {
    //     ctx.moveTo(x, 0);
    //     ctx.lineTo(x, canvas.height)
    // }

    // for (let y = 0; y < canvas.height; y += yPixelStep) {
    //     ctx.moveTo(0, y);
    //     ctx.lineTo(canvas.width, y)
    // }

    // ctx.strokeStyle = 'gray';
    // ctx.lineWidth = 1;
    // ctx.stroke();

    // drawAxes()
}

// function drawAxes() {
//     ctx.beginPath();
//     ctx.moveTo(canvas.width / 2, 0);
//     ctx.lineTo(canvas.width / 2, canvas.height);

//     ctx.moveTo(0, canvas.height / 2);
//     ctx.lineTo(canvas.width, canvas.height / 2);

//     ctx.strokeStyle = 'black';
//     // ctx.lineWidth = 1;
//     ctx.stroke();
// }

// save equation in browser locator hash

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