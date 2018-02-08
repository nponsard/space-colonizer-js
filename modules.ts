export class player {
    position: number[]
    constructor(pos: number[]) {
        this.position = pos
    }
    public move(add: number) {
        this.position[0] += add
    }
}