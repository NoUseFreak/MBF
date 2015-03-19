
window.onload = function() {

    var view = new DebugView();
    var mbf = new Mbf();

    var jeff  = new Player('Jeff');
    jeff.setDeck(new Deck([
        new Card( "card1", {"name": "card1"})
    ]));
    mbf.addPlayer(jeff);

    var dries = new Player('Dries');
    dries.setDeck(new Deck([
        new Card("card2", {"name": "card2"})
    ]));
    mbf.addPlayer(dries);

    view.renderPlayers(mbf.players);

    mbf.prepare();
    view.renderActivePlayer(mbf.getActivePlayer());

    mbf.getActivePlayer().getHand().addCards(mbf.getActivePlayer().getDeck().draw());

    view.updatePlayer(mbf.getActivePlayer());
};
