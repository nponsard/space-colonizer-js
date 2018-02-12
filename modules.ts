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
    draw(context: CanvasRenderingContext2D) {
        context.fillStyle = "green"
        context.fillRect(this.position[0], this.position[1], 40, 40)
        let c = this.shoots.length
        console.log(c)
        for (let i = 0; i < c; i++) {
            this.shoots[i][1] -=10
            if (this.shoots[i][1]<10){
                this.shoots.splice(i,1)
                c-=1
            }
            else {
                context.fillStyle = "yellow"
                context.fillRect(this.shoots[i][0], this.shoots[i][1], 10, 20)
            }
        }
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
        context.fillRect(this.position[0],this.position[1],40,40)
        let c = this.shoots.length
        for (let i = 0; i < c; i++) {
            this.shoots[i][1] += this.shoots[i][2]
            if (this.shoots[i][1]>600){
                this.shoots.splice(i,1)
                c-=1
            }
            else {
                context.fillStyle = "red"
                context.fillRect(this.shoots[i][0], this.shoots[i][1], 10, 20)
            }
        }
    }
}