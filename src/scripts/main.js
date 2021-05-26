import Graph from './graph.js';

const equationField = document.getElementById('equation-field');
const xminField = document.getElementById('xmin');
const xmaxField = document.getElementById('xmax');
const yminField = document.getElementById('ymin');
const ymaxField = document.getElementById('ymax');

// variables for math parsing 
let expression = 'sin(x)';
let scope = {
    x: 0,
}
let graph;

// initExprFromHash();

// update from back and forward buttons
// window.addEventListener('hashchange', initExprFromHash);

window.onload = function () {  
    graph = new Graph({  
        canvasId: "graph-window",  
        minX: -10,  
        minY: -10,  
        maxX: 10,  
        maxY: 10,  
        // unitsPerTick: 5
        unitsPerTickX: 2,
        unitsPerTickY: 2
    });  
    
    graph.drawEquation((x) => {
        return evaluateFunction(x);
    }, "black", 3);
    
    equationField.value = expression;
    equationField.addEventListener('keyup', event => {
        expression = equationField.value;
        // setHashFromExpr();
        graph.drawEquation((x) => {
            return evaluateFunction(x)
        }, "black", 3);  
    });
    
    const domainFields = [
        {
            field: xminField,
            changeFunc: graph.setXMin
        },
        {
            field: xmaxField,
            changeFunc: graph.setXMax
        },
        {
            field: yminField,
            changeFunc: graph.setYMin
        },
        {
            field: ymaxField,
            changeFunc: graph.setYMax
        },
    ]
    
    for (const domainField of domainFields) {
        domainField.field.addEventListener('change', event => {
            const val = changeDomainElement(domainField.field, domainField.changeFunc);
            domainField.field.value = val;
        })
    }
}; 

// get the value of input element and pass it to the set function 
function changeDomainElement(inputElement, setFunc) {
    // func.call() sets 'this' (the keyword) reference in the function, followed by func args
    const val = setFunc.call(graph, Number(inputElement.value));
    graph.calculateParams();
    graph.drawEquation((x) => {
        return evaluateFunction(x);
    }, "black", 3);
    return val;
}

// return the y coordinate in the math space of the given argument number
function evaluateFunction(arg) {
    scope.x = arg;
    return math.evaluate(expression, scope);
}

// function getHash() {
//     return location.hash.substr(1);
// }

// // set hash value of locator
// function setHash(val) {
//     location.hash = val;
// }

// function setHashFromExpr() {
//     setHash(expression);
// }

// function initExprFromHash() {
//     let hash = getHash();
//     // if no hash
//     if (hash) {
//         expression = hash;
//     } else {
//         expression = 'sin(x)';
//         setHashFromExpr();
//     }
//     equationField.value = expression;
//     graph.drawEquation(evaluateFunction, "green", 3);  
// }