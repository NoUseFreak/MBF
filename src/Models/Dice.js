class Dice
{
    constructor(sides = 20) {
        this.sides = sides;
        this.value = this.sides;
    }

    roll() {
        return this.value = Math.floor((Math.random() * this.sides) + 1);
    }
}
