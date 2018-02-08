import {test} from "./utils"

let requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        function (callback) {                   // Pour les mauvais
            window.setTimeout(callback, 1000 / 60);
        };
})();
let color: string[] = ["black"]
let pts: number[][] = [[-10, -10,]]
let x, y: number
x = 1
y = 1
document.addEventListener('dblclick', function (e) {
    pts.push([x, y])
    color.push("green")
})
document.addEventListener('click', function (e) {
    pts.push([x, y])
    color.push("red")
})
document.addEventListener('mousemove', function (e) {
    x = e.clientX
    y = e.clientY
})
test()
// @ts-ignore
require(['scripts/domReady'], function (domReady) {
    domReady(function () {
        var canvas = <HTMLCanvasElement>document.querySelector('#canvas');
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        var context = canvas.getContext('2d');
        let p = 1
    
        function draw() {
            context.fillStyle = "#fff"
            context.fillRect(0, 0, canvas.width, canvas.height)
            let c = pts.length
            for (let i = 0; i < c; i++) {
                context.fillStyle = color[i]
                context.fillRect(pts[i][0], pts[i][1], 5, 5)
            }
            context.beginPath()
            context.lineWidth = 3
            context.strokeStyle = "yellow"
            context.moveTo(canvas.width/2,canvas.height/2)
            context.lineTo(x,y)
            context.stroke()
    
            context.fillStyle = "black"
            context.fillRect(x, y, 5, 5)
            requestAnimFrame(function () { draw() });
        }
    
        draw();
    });
  });
