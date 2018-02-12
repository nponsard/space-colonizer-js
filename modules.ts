export class player {
    position: number[]
    shoots: number[][] = []
    constructor(pos: number[]) {
        this.position = pos
    }
    public move(add: number) {
        this.position[0] += add
    }
    shoot() {
        this.shoots.push([this.position[0] + 15, this.position[1] - 10])
    }
    draw(context: CanvasRenderingContext2D, mobs: mob[]): mob[] {
        context.fillStyle = "green"
        context.fillRect(this.position[0], this.position[1], 40, 40)
        let c = this.shoots.length
        console.log(c)
        let n = 0
        for (let i = 0; i < c; i++) {
            n = 0
            this.shoots[i][1] -= 10
            let d = mobs.length
            for (let j = 0; j < d; j++) {
                if (this.shoots[i][0] + 10 > mobs[j].position[0] && this.shoots[i][0] < mobs[j].position[0] + 40 && this.shoots[i][1] - 20 > mobs[j].position[1] && this.shoots[i][1] < mobs[j].position[1] + 40) {
                    n = 1
                    mobs.splice(j, 1)
                    d -= 1
                }

            }
            if (this.shoots[i][1] < 10 || n === 1) {
                this.shoots.splice(i, 1)
                c -= 1
            }
            else if (n === 0) {
                context.fillStyle = "yellow"
                context.fillRect(this.shoots[i][0], this.shoots[i][1], 10, 20)
            }
        }
        return mobs
    }
}
export class mob {
    position: number[]
    shoots: number[][] = []
    constructor(pos: number[]) {
        this.position = pos
    }
    move(add: number[]) {
        this.position[0] += add[0]
        this.position[1] += add[1]
    }
    shoot(speed) {
        this.shoots.push([this.position[0] + 15, this.position[1] + 40, speed])

    }
    draw(context: CanvasRenderingContext2D) {
        context.fillStyle = "blue"
        context.fillRect(this.position[0], this.position[1], 40, 40)
        let c = this.shoots.length
        for (let i = 0; i < c; i++) {
            this.shoots[i][1] += this.shoots[i][2]
            if (this.shoots[i][1] > 600) {
                this.shoots.splice(i, 1)
                c -= 1
            }
            else {
                context.fillStyle = "red"
                context.fillRect(this.shoots[i][0], this.shoots[i][1], 10, 20)
            }
        }
    }
}