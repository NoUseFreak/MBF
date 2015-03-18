class Player {

    constructor(name) {
        this.name = name;

        this.deck = null;
        this.hand = new Hand();
    }

    setDeck(deck) {
        this.deck = deck;
    }

    getDeck() {
        return this.deck;
    }

    getHand() {
        return this.hand;
    }
}
