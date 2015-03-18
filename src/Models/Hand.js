class Hand extends CardSlot {

    addCards(cards) {
        for (let card in cards) {
            this.addCard(cards[card]);
        }
    }
}
