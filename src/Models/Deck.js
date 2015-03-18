class Deck extends CardSlot {
    constructor(cards) {
        super(cards);
        this.cards = this.shuffle();
    }

    draw(count) {
        if (typeof(count) == "undefined") {
            count = 1;
        }

        if (count > this.count()) {
            throw "No more cards in deck.";
        }

        var cards = [];
        for (var i = 0; i < count; i++) {
            cards.push(this.cards.shift());
        }

        return cards;
    }
}
