const canvas = <HTMLCanvasElement>document.getElementById('graph-window');
const ctx = canvas.getContext('2d');

// let xmin: number,
//     xmax: number,
//     ymin: number,
//     ymax: number;

const equationField = <HTMLInputElement>document.getElementById('equation');
const xminField = <HTMLInputElement>document.getElementById('xmin');
const xmaxField = <HTMLInputElement>document.getElementById('xmax');
const yminField = <HTMLInputElement>document.getElementById('ymin');
const ymaxField = <HTMLInputElement>document.getElementById('ymax');

const width = canvas.width;
const height = canvas.height;

const plot = function plot(fn: (arg: number) => (number), domain: number[]) {
    const widthScale = (width / (domain[1] - domain[0]));
    const heightScale = (height / (domain[3] - domain[2]));
    let first = true;

    ctx!.beginPath();

    for (let x = 0; x < width; x++) {
        let xVal = (x / widthScale) - domain[0];
        let yVal = (fn(xVal) - domain[2]) * heightScale;

        yVal = height - yVal; // (0,0) to left

        if (first) {
            ctx!.moveTo(x, yVal);
            first = false;
        } else {
            ctx!.lineTo(x, yVal);
        }

        ctx!.strokeStyle = 'red';
        ctx!.lineWidth = 3;
        ctx!.stroke();
    }
}

function render() {
    

    plot((x) => {
        return Math.cos(x);
    }, [
        Number(xminField.value),
        Number(xmaxField.value),
        Number(yminField.value),
        Number(ymaxField.value),
    ]);
}

function parseEquation(inputStr: string) {
    return 'hey';
}

// plot((x) => {
//     return Math.cos(x);
// }, [0, Math.PI * 4, -4, 4]);