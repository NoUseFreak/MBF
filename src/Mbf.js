
class Mbf
{
    constructor(){
        this.players = [];
        this.activePlayerIndex = null;
    }

    addPlayer(player) {
        if (player.deck === null) {
            throw "Player '{0}' did not bring a deck!".replace("{0}", player.name);
        }

        for (let participant of this.players) {
            if (participant === player) {
                throw "Player '{0}' already in the game!".replace("{0}", player.name);
            }
        }

        this.players.push(player);
    }

    prepare() {
        this._shuffleDecks();
        this._pickActivePlayer();
    }

    getActivePlayer() {
        return this.players[this.activePlayerIndex];
    }

    _shuffleDecks() {
        for (let player of this.players) {
            player.deck.shuffle();
        }
    }

    _pickActivePlayer() {
        var dice = new Dice();
        var counts = [];

        while (this.activePlayerIndex == null) {
            counts = [];
            for (let player of this.players) {
                counts.push(dice.roll());
            }

            var highes = Math.max.apply(null, counts);

            this.activePlayerIndex = counts.indexOf(highes);
        }
    }
}