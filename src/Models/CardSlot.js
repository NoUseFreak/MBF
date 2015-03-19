
class CardSlot {
    constructor(cards = []) {
        this.cards = cards;
    }

    addCard(card) {
        this.cards.push(card);
    }

    shuffle() {
        for (var i = this.cards.length-1; i >=0; i--) {

            var randomIndex = Math.floor(Math.random()*(i+1));
            var itemAtIndex = this.cards[randomIndex];

            this.cards[randomIndex] = this.cards[i];
            this.cards[i] = itemAtIndex;
        }
        return this.cards;
    }

    all() {
        return this.cards;
    }

    count() {
        return this.cards.length;
    }
}
