export default class Graph {
    constructor(config) {
        // user defined properties  
        this.canvas = document.getElementById(config.canvasId);
        this.minX = config.minX;
        this.minY = config.minY;
        this.maxX = config.maxX;
        this.maxY = config.maxY;
        this.unitsPerTick = config.unitsPerTick;
        
        // constants  
        this.axisColor = "#aaa";
        this.font = "8pt Calibri";
        this.tickSize = 20;
        
        // relationships; initialize graph parameters
        this.context = this.canvas.getContext("2d");
        this.calculateParams();
        
        // draw x and y axis  
        // this.drawXAxis();
        // this.drawYAxis();
    }
    
    calculateParams() {
        this.rangeX = this.maxX - this.minX;
        this.rangeY = Math.abs(this.maxY - this.minY);
        this.unitX = this.canvas.width / this.rangeX;
        this.unitY = this.canvas.height / this.rangeY;
        
        this.centerY = -Math.round((this.minY / this.rangeY) * this.canvas.height);
        this.centerX = -Math.round((this.minX / this.rangeX) * this.canvas.width);
        this.iteration = (this.maxX - this.minX) / 1000;
        this.scaleX = this.canvas.width / this.rangeX;
        this.scaleY = this.canvas.height / this.rangeY;
        
        // console.log('vals', this.minX, this.maxX, this.rangeX);
        // console.log('vals', this.unitX); // error when xmax - xmin <= 0; unitx = infinity
    }
    
    // set min x value on graph window
    setXMin(newX) {
        if (newX < this.maxX) {
            this.minX = newX;
        }
        return this.minX;
    }
    
    // set max x value on graph window
    setXMax(newX) {
        if (newX > this.minX) {
            this.maxX = newX;
        }
        return this.maxX;
    }
    
    // set min y value on graph window
    setYMin(newY) {
        if (newY < -this.minY) {
            this.maxY = -newY;
        }
        return -this.maxY;
    }
    
    // set max y value on graph window 
    setYMax(newY) {
        if (newY > -this.maxY) {
            this.minY = -newY;
        }
        return -this.minY;
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
        
        // draw left tick marks  
        xPos = this.centerX - xPosIncrement;

        // vars to determine when x axis should stick to sides and which side of the axis to put labels
        const stickAxisTop = this.centerY <= 0;
        const stickAxisBottom = this.centerY >= this.canvas.height;
        const yOffsetDir = (stickAxisTop) ? -1 : 1;
        
        // the y position of the x axis
        let yAxisPos = stickAxisTop ? 0 : stickAxisBottom ? this.canvas.height : this.centerY;

        unit = -1 * this.unitsPerTick;
        while (xPos > 0) {
            context.moveTo(xPos, yAxisPos - this.tickSize / 2);
            context.lineTo(xPos, yAxisPos + this.tickSize / 2);
            context.stroke();

            const yPos = this.calculateYPos(yOffsetDir, stickAxisTop, stickAxisBottom);

            context.fillText(unit, xPos, yPos);
            unit -= this.unitsPerTick;
            xPos = Math.round(xPos - xPosIncrement);
        }
        
        // draw right tick marks  
        xPos = this.centerX + xPosIncrement;
        unit = this.unitsPerTick;
        while (xPos < this.canvas.width) {
            context.moveTo(xPos, yAxisPos - this.tickSize / 2);
            context.lineTo(xPos, yAxisPos + this.tickSize / 2);
            context.stroke();

            const yPos = this.calculateYPos(yOffsetDir, stickAxisTop, stickAxisBottom);

            context.fillText(unit, xPos, yPos);
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
        
        // vars to determine when y axis should stick to sides and which side of the axis to put labels
        const stickAxisLeft = this.centerX <= 0;
        const stickAxisRight = this.centerX >= this.canvas.width;
        const xOffsetDir = (stickAxisLeft) ? 1 : -1;
        
        let xAxisPos = stickAxisLeft ? 0 : stickAxisRight ? this.canvas.width : this.centerX;
        
        unit = this.unitsPerTick;
        while (yPos > 0) {
            context.moveTo(xAxisPos - this.tickSize / 2, yPos);
            context.lineTo(xAxisPos + this.tickSize / 2, yPos);
            context.stroke();

            const xPos = this.calculateXPos(unit, xOffsetDir, stickAxisLeft, stickAxisRight);
            
            context.fillText(unit, xPos, yPos);
            unit += this.unitsPerTick;
            yPos = Math.round(yPos - yPosIncrement);
        }
        
        // draw bottom tick marks  
        yPos = this.centerY + yPosIncrement;
        unit = -1 * this.unitsPerTick;
        while (yPos < this.canvas.height) {
            context.moveTo(xAxisPos - this.tickSize / 2, yPos);
            context.lineTo(xAxisPos + this.tickSize / 2, yPos);
            context.stroke();

            const xPos = this.calculateXPos(unit, xOffsetDir, stickAxisLeft, stickAxisRight);
            
            context.fillText(unit, xPos, yPos);
            unit -= this.unitsPerTick;
            yPos = Math.round(yPos + yPosIncrement);
        }
        context.restore();
    }

    // given relevant params, calculate the yposition of the x axis label
    calculateYPos(yOffsetDir, stickAxisTop, stickAxisBottom) {
        let y = (this.tickSize / 2 * yOffsetDir);
        if (stickAxisBottom) {
            y += (10 * yOffsetDir) + this.canvas.height - 43;
        } else if (stickAxisTop) {
            y += 20;
        } else {
            y += this.centerY;
        }
        return y;
    }
    
    // given relevant params, calculate the xposition of the y axis label
    calculateXPos(unit, xOffsetDir, stickAxisLeft, stickAxisRight) {
        let xOffset = (unit + '').replace('.', '').length;
        let x = (this.tickSize / 2 * xOffsetDir) + (xOffset * xOffsetDir);
        if (stickAxisLeft) {
            x += ((xOffset * 4 + 6) * xOffsetDir);
        } else if (stickAxisRight) {
            x += this.canvas.width;
        } else {
            x += this.centerX;
        }
        return x;
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