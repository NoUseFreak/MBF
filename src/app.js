
window.onload = function() {

    var view = new DebugView();
    var mtfbf = new Mtgbf();

    var jeff  = new Player('Jeff');
    jeff.setDeck(new Deck([
        new Card( "card1", {"name": "card1"})
    ]));
    mtfbf.addPlayer(jeff);

    var dries = new Player('Dries');
    dries.setDeck(new Deck([
        new Card("card2", {"name": "card2"})
    ]));
    mtfbf.addPlayer(dries);

    view.renderPlayers(mtfbf.players);

    mtfbf.prepare();
    view.renderActivePlayer(mtfbf.getActivePlayer());

    mtfbf.getActivePlayer().getHand().addCards(mtfbf.getActivePlayer().getDeck().draw());

    view.updatePlayer(mtfbf.getActivePlayer());

};
