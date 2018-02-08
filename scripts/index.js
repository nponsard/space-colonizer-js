(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();
    let left = 0;
    let right = 0;
    let acc = 0;
    document.addEventListener("keydown", function (e) {
        console.log(e.key);
        if (e.key === "ArrowLeft") {
            left = 1;
        }
        if (e.key === "ArrowRight") {
            right = 1;
        }
    });
    document.addEventListener("keyup", function (e) {
        if (e.key === "ArrowLeft") {
            left = 0;
        }
        if (e.key === "ArrowRight") {
            right = 0;
        }
    });
    // @ts-ignore
    require(['scripts/domReady'], function (domReady) {
        domReady(function () {
            var canvas = document.querySelector('#canvas');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            var context = canvas.getContext('2d');
            let p = 1;
            function draw() {
                context.fillStyle = "#fff";
                context.fillRect(0, 0, canvas.width, canvas.height);
                let c = pts.length;
                for (let i = 0; i < c; i++) {
                    context.fillStyle = color[i];
                    context.fillRect(pts[i][0], pts[i][1], 5, 5);
                }
                context.beginPath();
                context.lineWidth = 3;
                context.strokeStyle = "yellow";
                context.moveTo(canvas.width / 2, canvas.height / 2);
                context.lineTo(x, y);
                context.stroke();
                context.fillStyle = "black";
                context.fillRect(x, y, 5, 5);
                requestAnimFrame(function () { draw(); });
            }
            draw();
        });
    });
});
