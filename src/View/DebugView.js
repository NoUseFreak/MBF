
class DebugView
{
    constructor() {
        console.info("Setting up the game.");
    }

    renderPlayers(players) {
        console.info("Rendering players");

        var template = '<% _.each(players, function(player) { %>' +
            '<fieldset>' +
                '<legend><%= player.name %></legend>' +
                '<dl>' +
                    '<dt class="js-deck">deck</dt><dd><%= player.getDeck().count() %></dd>' +
                    '<dt class="js-hand">hand</dt><dd><%= player.getHand().count() %></dd>' +
                '</dl>' +
            '</fieldset>' +
            '<% }); %>';

        $('.js-players').html(_.template(template)({
            "players": players
        }));
    }

    renderActivePlayer(player) {
        console.info("Player '{0}' will start.".replace('{0}', player.name));

        var $players = $('.js-players fieldset');

        $players.find('legend')
            .css('font-weight', 'normal')
            .css('text-decoration', 'none');
        $players.find('legend:contains("' + player.name + '")')
            .css('font-weight', 'bold')
            .css('text-decoration', 'underline');
    }

    _findPlayerContainer(player) {
        return $('.js-players fieldset legend:contains("' + player.name + '")').parent()
    }

    updatePlayer(player) {
        console.info("Update player '{0}' view.".replace('{0}', player.name));

        this._findPlayerContainer(player)
            .find('.js-deck').next().html(player.getDeck().count());

        var cards = '';;
        for (let card in player.getHand().all()) {
            cards += ' ' + player.getHand().all()[card].name;

        }

        this._findPlayerContainer(player)
            .find('.js-hand').next().html(player.getHand().count() + '[' + cards + ']');
    }
}