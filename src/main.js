"use strict";
var canvas = document.getElementById('graph-window');
var ctx = canvas.getContext('2d');
// let xmin: number,
//     xmax: number,
//     ymin: number,
//     ymax: number;
var equationField = document.getElementById('equation');
var xminField = document.getElementById('xmin');
var xmaxField = document.getElementById('xmax');
var yminField = document.getElementById('ymin');
var ymaxField = document.getElementById('ymax');
var width = canvas.width;
var height = canvas.height;
var plot = function plot(fn, domain) {
    var widthScale = (width / (domain[1] - domain[0]));
    var heightScale = (height / (domain[3] - domain[2]));
    var first = true;
    ctx.beginPath();
    for (var x = 0; x < width; x++) {
        var xVal = (x / widthScale) - domain[0];
        var yVal = (fn(xVal) - domain[2]) * heightScale;
        yVal = height - yVal; // (0,0) to left
        if (first) {
            ctx.moveTo(x, yVal);
            first = false;
        }
        else {
            ctx.lineTo(x, yVal);
        }
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 3;
        ctx.stroke();
    }
};
function render() {
    plot(function (x) {
        return Math.cos(x);
    }, [
        Number(xminField.value),
        Number(xmaxField.value),
        Number(yminField.value),
        Number(ymaxField.value),
    ]);
}
function parseEquation(inputStr) {
    return 'hey';
}
// plot((x) => {
//     return Math.cos(x);
// }, [0, Math.PI * 4, -4, 4]);
