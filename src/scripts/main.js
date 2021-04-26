const equationField = document.getElementById('equation-field');
const xminField = document.getElementById('xmin');
const xmaxField = document.getElementById('xmax');
const yminField = document.getElementById('ymin');
const ymaxField = document.getElementById('ymax');

const range = [xminField, xmaxField, yminField, ymaxField];
// const canvas = document.getElementById('graph-window');
// const ctx = canvas.getContext('2d');

// variables for math parsing 
let expression = 'sin(x)';
let scope = {
    x: 0,
}
let graph;

// initExprFromHash();

// listen for changes to text input field 

// update from back and forward buttons
// window.addEventListener('hashchange', initExprFromHash);

window.onload = function () {  
    graph = new Graph({  
        canvasId: "graph-window",  
        minX: -10,  
        minY: -9,  
        maxX: 10,  
        maxY: 10,  
        unitsPerTick: 1  
    });  
    
    graph.drawEquation((x) => {
        return evaluateFunction(x);
    }, "black", 3);
    
    equationField.value = expression;
    equationField.addEventListener('keyup', event => {
        expression = equationField.value;
        // setHashFromExpr();
        graph.drawEquation((x) => {
            // console.log(evaluateFunction(x));
            return evaluateFunction(x)
            // return test(x);
        }, "black", 3);  
    });

    xminField.addEventListener('change', event => {
        const newX = Number(xminField.value);

        if (newX >= -1) {
            graph.minX = -1;   
            xminField.value = -1;
        } else {
            graph.minX = newX;
        }
        
        graph.reCalculate();
        graph.drawEquation((x) => {
            return evaluateFunction(x);
        }, "black", 3);
    });

    xmaxField.addEventListener('change', event => {
        const newX = Number(xmaxField.value);

        if (newX <= 1) {
            graph.maxX = 1;   
            xmaxField.value = 1;
        } else {
            graph.maxX = newX;
        }

        graph.reCalculate();
        graph.drawEquation((x) => {
            return evaluateFunction(x);
        }, "black", 3);
    });

    yminField.addEventListener('change', event => {
        const newY = -Number(yminField.value);

        if (newY <= 1) {
            graph.maxY = 1;   
            yminField.value = -1;
        } else {
            graph.maxY = newY;
        }

        graph.reCalculate();
        graph.drawEquation((x) => {
            return evaluateFunction(x);
        }, "black", 3);
    });

    ymaxField.addEventListener('change', event => {
        const newY = -Number(ymaxField.value);

        if (newY >= -1) {
            graph.minY = -1;   
            ymaxField.value = 1;
        } else {
            graph.minY = newY;
        }

        graph.reCalculate();
        graph.drawEquation((x) => {
            return evaluateFunction(x);
        }, "black", 3);
    });
}; 

// return the y coordinate in the math space of the given argument number
function evaluateFunction(arg) {
    scope.x = arg;
    return math.evaluate(expression, scope);
}

class Graph {
    constructor(con) {
        // user defined properties  
        this.canvas = document.getElementById(con.canvasId);
        this.minX = con.minX;
        this.minY = con.minY;
        this.maxX = con.maxX;
        this.maxY = con.maxY;
        this.unitsPerTick = con.unitsPerTick;
        
        // constants  
        this.axisColor = "#aaa";
        this.font = "8pt Calibri";
        this.tickSize = 20;
        
        // relationships  
        this.context = this.canvas.getContext("2d");
        this.rangeX = this.maxX - this.minX;
        this.rangeY = this.maxY - this.minY;
        this.unitX = this.canvas.width / this.rangeX;
        this.unitY = this.canvas.height / this.rangeY;
        this.centerY = Math.round(Math.abs(this.minY / this.rangeY) * this.canvas.height);
        this.centerX = Math.round(Math.abs(this.minX / this.rangeX) * this.canvas.width);
        this.iteration = (this.maxX - this.minX) / 1000;
        this.scaleX = this.canvas.width / this.rangeX;
        this.scaleY = this.canvas.height / this.rangeY;
        
        // draw x and y axis  
        this.drawXAxis();
        this.drawYAxis();
    }
    reCalculate() {
        this.rangeX = this.maxX - this.minX;
        this.rangeY = Math.abs(this.maxY - this.minY);
        this.unitX = this.canvas.width / this.rangeX;
        this.unitY = this.canvas.height / this.rangeY;
        this.centerY = Math.round(Math.abs(this.minY / this.rangeY) * this.canvas.height);
        this.centerX = Math.round(Math.abs(this.minX / this.rangeX) * this.canvas.width);
        this.iteration = (this.maxX - this.minX) / 1000;
        this.scaleX = this.canvas.width / this.rangeX;
        this.scaleY = this.canvas.height / this.rangeY;
    }
    drawXAxis() {
        let context = this.context;
        context.save();
        context.beginPath();
        context.moveTo(0, this.centerY);
        context.lineTo(this.canvas.width, this.centerY);
        context.strokeStyle = this.axisColor;
        context.lineWidth = 2;
        context.stroke();
        
        // draw tick marks  
        let xPosIncrement = this.unitsPerTick * this.unitX;
        let xPos, unit;
        context.font = this.font;
        context.textAlign = "center";
        context.textBaseline = "top";

        // const tickSkip = (this.maxX - this.minX > 50) ? 2 : 1;
        
        // draw left tick marks  
        xPos = this.centerX - xPosIncrement;
        unit = -1 * this.unitsPerTick;
        while (xPos > 0) {
            context.moveTo(xPos, this.centerY - this.tickSize / 2);
            context.lineTo(xPos, this.centerY + this.tickSize / 2);
            context.stroke();
            context.fillText(unit, xPos, this.centerY + this.tickSize / 2 + 3);
            unit -= this.unitsPerTick;
            xPos = Math.round(xPos - xPosIncrement);
        }
        
        // draw right tick marks  
        xPos = this.centerX + xPosIncrement;
        unit = this.unitsPerTick;
        while (xPos < this.canvas.width) {
            context.moveTo(xPos, this.centerY - this.tickSize / 2);
            context.lineTo(xPos, this.centerY + this.tickSize / 2);
            context.stroke();
            context.fillText(unit, xPos, this.centerY + this.tickSize / 2 + 3);
            unit += this.unitsPerTick;
            xPos = Math.round(xPos + xPosIncrement);
        }
        context.restore();
    }
    drawYAxis() {
        let context = this.context;
        context.save();
        context.beginPath();
        context.moveTo(this.centerX, 0);
        context.lineTo(this.centerX, this.canvas.height);
        context.strokeStyle = this.axisColor;
        context.lineWidth = 2;
        context.stroke();
        
        // draw tick marks   
        let yPosIncrement = this.unitsPerTick * this.unitY;
        let yPos, unit;
        context.font = this.font;
        context.textAlign = "right";
        context.textBaseline = "middle";
        
        // draw top tick marks  
        yPos = this.centerY - yPosIncrement;
        unit = this.unitsPerTick;
        while (yPos > 0) {
            context.moveTo(this.centerX - this.tickSize / 2, yPos);
            context.lineTo(this.centerX + this.tickSize / 2, yPos);
            context.stroke();
            context.fillText(unit, this.centerX - this.tickSize / 2 - 3, yPos);
            unit += this.unitsPerTick;
            yPos = Math.round(yPos - yPosIncrement);
        }
        
        // draw bottom tick marks  
        yPos = this.centerY + yPosIncrement;
        unit = -1 * this.unitsPerTick;
        while (yPos < this.canvas.height) {
            context.moveTo(this.centerX - this.tickSize / 2, yPos);
            context.lineTo(this.centerX + this.tickSize / 2, yPos);
            context.stroke();
            context.fillText(unit, this.centerX - this.tickSize / 2 - 3, yPos);
            unit -= this.unitsPerTick;
            yPos = Math.round(yPos + yPosIncrement);
        }
        context.restore();
    }
    drawEquation(equation, color, thickness) {
        let context = this.context;
        context.save();
        this.context.clearRect(0,0,this.canvas.width, this.canvas.height);  
        this.drawXAxis();
        this.drawYAxis();
        this.transformContext();
        
        context.beginPath();
        
        try {
            context.moveTo(this.minX, equation(this.minX));
            
            for (let x = this.minX + this.iteration; x <= this.maxX; x += this.iteration) {
                context.lineTo(x, equation(x));
            }
            
            context.restore();
            context.lineJoin = "round";
            context.lineWidth = thickness;
            context.strokeStyle = color;
            context.stroke();
            context.restore();
        } catch {
            context.restore();
        }     
    }
    transformContext() {
        let context = this.context;
        
        // move context to center of canvas  
        context.translate(this.centerX, this.centerY);
        
        context.scale(this.scaleX, -this.scaleY);
    }
}  

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
    graph.drawEquation(evaluateFunction, "green", 3);  
}