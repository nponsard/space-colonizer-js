export class player {
    position: number[]
    shoots: number[][] = [[900, 600]]
    constructor(pos: number[]) {
        this.position = pos
    }
    public move(add: number) {
        this.position[0] += add
    }
    shoot() {
        this.shoots.push([this.position[0] + 15, this.position[1] - 10])

    }
    draw(context: CanvasRenderingContext2D) {
        context.fillStyle = "green"
        context.fillRect(this.position[0], this.position[1], 40, 40)
        let c = this.shoots.length
        for (let i = 0; i < c; i++) {
            this.shoots[i][1] -= 10
            context.fillStyle = "yellow"
            context.fillRect(this.shoots[i][0], this.shoots[i][1], 10, 20)
        }
    }
}
export class mob {
    position: number[]
    shoots: number[][] = [[800,800]]
    constructor(pos: number[]) {
        this.position = pos
    }
    move(add: number[]) {
        this.position[0] += add[0]
        this.position[1] += add[1]
    }
    shoot() {
        this.shoots.push([this.position[0] + 15, this.position[1] + 40])

    }
    draw(context: CanvasRenderingContext2D) {
        context.fillStyle = "blue"
        context.fillRect(this.position[0],this.position[1],40,40)
        let c = this.shoots.length
        for (let i = 0; i < c; i++) {
            this.shoots[i][1] += 10
            context.fillStyle = "red"
            context.fillRect(this.shoots[i][0], this.shoots[i][1], 10, 20)
        }
    }

}