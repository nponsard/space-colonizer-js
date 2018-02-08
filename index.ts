import * as modules from "./modules"


let requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        function (callback) {                   // Pour les mauvais
            window.setTimeout(callback, 1000 / 60);
        };
})();
let left = 0
let right = 0
let acc = 0

document.addEventListener("keydown", function (e) {
    console.log(e.key)
    if (e.key === "ArrowLeft") {
        left = 1
    }
    if (e.key === "ArrowRight") {
        right = 1
    }
})
document.addEventListener("keyup", function (e) {
    if (e.key === "ArrowLeft") {
        left = 0
    }
    if (e.key === "ArrowRight") {
        right = 0
    }
})

// @ts-ignore
require(['scripts/domReady'], function (domReady) {
    domReady(function () {
        var canvas = <HTMLCanvasElement>document.querySelector('#canvas');
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        var context = canvas.getContext('2d');
        let p1 = new modules.player([100, 100])

        function draw() {
            context.fillStyle = "#000"
            context.fillRect(0, 0, canvas.width, canvas.height)
            if (left && acc > -15) {
                acc -= 1
            }
            else if (!left && acc < 0) {
                acc += 2
                if (acc > -3) {
                    acc = 0
                }
            }
            else if (right && acc < 15) {
                acc += 1
            } else if (!right && acc > 0) {
                acc -= 2
                if (acc < 3) {
                    acc = 0
                }
            }
            if (p1.position[0] + acc > 0 && p1.position[0] + acc < 760) {
                p1.move(acc)
            }
            else if (p1.position[0] < 30) {
                p1.position[0] = 0
            }
            else if (p1.position[0] > 730) {
                p1.position[0] = 760
            }
            context.fillStyle = "green"
            context.fillRect(p1.position[0], p1.position[1], 40, 40)
            requestAnimFrame(function () { draw() });
        }

        draw();
    });
});
