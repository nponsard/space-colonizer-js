(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./modules"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const modules = require("./modules");
    let requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();
    let left = 0;
    let right = 0;
    let acc = 0;
    let pause = false;
    document.addEventListener("keydown", function (e) {
        console.log(e.key);
        switch (e.key) {
            case "ArrowLeft":
                left = 1;
                break;
            case "ArrowRight":
                right = 1;
                break;
            case "Escape":
                if (pause) {
                    pause = false;
                }
                else {
                    pause = true;
                }
                break;
            case " ":
                pause = false;
                break;
            default:
                break;
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
            canvas.width = 800;
            canvas.height = 600;
            var context = canvas.getContext('2d');
            let p1 = new modules.player([400, 500], 3);
            let phase = 0;
            let mobs = [];
            let mvs = 0;
            for (let y = 0; y < 3; y++) {
                for (let x = 0; x < 18; x++) {
                    mobs.push(new modules.mob([4 + x * 42, y * 42]));
                }
            }
            function draw() {
                if (!pause) {
                    if (p1.life < 1) {
                        canvas.setAttribute("style", "display : none");
                        document.querySelector("#End").setAttribute("style", "display:block");
                    }
                    context.fillStyle = "#000";
                    context.fillRect(0, 0, canvas.width, canvas.height);
                    if (left && acc > -15) {
                        acc -= 1;
                    }
                    else if (!left && acc < 0) {
                        acc += 2;
                        if (acc > -3) {
                            acc = 0;
                        }
                    }
                    else if (right && acc < 15) {
                        acc += 1;
                    }
                    else if (!right && acc > 0) {
                        acc -= 2;
                        if (acc < 3) {
                            acc = 0;
                        }
                    }
                    if (p1.position[0] + acc > 0 && p1.position[0] + acc < 760) {
                        p1.move(acc);
                    }
                    else if (p1.position[0] < 30) {
                        p1.position[0] = 0;
                    }
                    else if (p1.position[0] > 730) {
                        p1.position[0] = 760;
                    }
                    phase += 1;
                    if (phase % 10 === 0) {
                        p1.shoot();
                    }
                    mobs = p1.draw(context, mobs);
                    let c = mobs.length;
                    if (phase % 50 === 0) {
                        mvs += 1;
                    }
                    for (let i = 0; i < c; i++) {
                        if (phase % 50 === 0) {
                            if (mvs === 16) {
                                mobs[i].move([0, 5]);
                            }
                            else if (mvs > 8) {
                                mobs[i].move([-5, 0]);
                            }
                            if (mvs < 8) {
                                mobs[i].move([5, 0]);
                            }
                            if (mvs === 8) {
                                mobs[i].move([0, 5]);
                            }
                        }
                        if (phase % 10 === 0) {
                            if (Math.random() > 0.98) {
                                mobs[i].shoot(Math.floor(Math.random() * 5 + 3));
                            }
                        }
                        mobs[i].draw(context, p1);
                    }
                    if (mvs === 16) {
                        mvs = 0;
                    }
                }
                else {
                    context.fillStyle = "#ff8000";
                    context.font = "60px Arial";
                    context.fillText("Pause", 370, 200);
                }
                requestAnimFrame(function () { draw(); });
            }
            draw();
        });
    });
});
