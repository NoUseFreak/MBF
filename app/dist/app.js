"use strict";
var Mbf = function Mbf() {
  this.players = [];
  this.activePlayerIndex = null;
};
($traceurRuntime.createClass)(Mbf, {
  addPlayer: function(player) {
    if (player.deck === null) {
      throw "Player '{0}' did not bring a deck!".replace("{0}", player.name);
    }
    var $__4 = true;
    var $__5 = false;
    var $__6 = undefined;
    try {
      for (var $__2 = void 0,
          $__1 = (this.players)[$traceurRuntime.toProperty(Symbol.iterator)](); !($__4 = ($__2 = $__1.next()).done); $__4 = true) {
        var participant = $__2.value;
        {
          if (participant === player) {
            throw "Player '{0}' already in the game!".replace("{0}", player.name);
          }
        }
      }
    } catch ($__7) {
      $__5 = true;
      $__6 = $__7;
    } finally {
      try {
        if (!$__4 && $__1.return != null) {
          $__1.return();
        }
      } finally {
        if ($__5) {
          throw $__6;
        }
      }
    }
    this.players.push(player);
  },
  prepare: function() {
    this._shuffleDecks();
    this._pickActivePlayer();
  },
  getActivePlayer: function() {
    return this.players[this.activePlayerIndex];
  },
  _shuffleDecks: function() {
    var $__4 = true;
    var $__5 = false;
    var $__6 = undefined;
    try {
      for (var $__2 = void 0,
          $__1 = (this.players)[$traceurRuntime.toProperty(Symbol.iterator)](); !($__4 = ($__2 = $__1.next()).done); $__4 = true) {
        var player = $__2.value;
        {
          player.deck.shuffle();
        }
      }
    } catch ($__7) {
      $__5 = true;
      $__6 = $__7;
    } finally {
      try {
        if (!$__4 && $__1.return != null) {
          $__1.return();
        }
      } finally {
        if ($__5) {
          throw $__6;
        }
      }
    }
  },
  _pickActivePlayer: function() {
    var dice = new Dice();
    var counts = [];
    while (this.activePlayerIndex == null) {
      counts = [];
      var $__4 = true;
      var $__5 = false;
      var $__6 = undefined;
      try {
        for (var $__2 = void 0,
            $__1 = (this.players)[$traceurRuntime.toProperty(Symbol.iterator)](); !($__4 = ($__2 = $__1.next()).done); $__4 = true) {
          var player = $__2.value;
          {
            counts.push(dice.roll());
          }
        }
      } catch ($__7) {
        $__5 = true;
        $__6 = $__7;
      } finally {
        try {
          if (!$__4 && $__1.return != null) {
            $__1.return();
          }
        } finally {
          if ($__5) {
            throw $__6;
          }
        }
      }
      var highes = Math.max.apply(null, counts);
      this.activePlayerIndex = counts.indexOf(highes);
    }
  }
}, {});

"use strict";
window.onload = function() {
  var view = new DebugView();
  var mbf = new Mbf();
  var jeff = new Player('Jeff');
  jeff.setDeck(new Deck([new Card("card1", {"name": "card1"})]));
  mbf.addPlayer(jeff);
  var dries = new Player('Dries');
  dries.setDeck(new Deck([new Card("card2", {"name": "card2"})]));
  mbf.addPlayer(dries);
  view.renderPlayers(mbf.players);
  mbf.prepare();
  view.renderActivePlayer(mbf.getActivePlayer());
  mbf.getActivePlayer().getHand().addCards(mbf.getActivePlayer().getDeck().draw());
  view.updatePlayer(mbf.getActivePlayer());
};

"use strict";
var Card = function Card(name, properties) {
  this.name = name;
  this.properties = properties;
};
($traceurRuntime.createClass)(Card, {}, {});

"use strict";
var CardSlot = function CardSlot(cards) {
  if (typeof(cards) == "undefined") {
    cards = [];
  }
  this.cards = cards;
};
($traceurRuntime.createClass)(CardSlot, {
  addCard: function(card) {
    this.cards.push(card);
  },
  shuffle: function() {
    for (var i = this.cards.length - 1; i >= 0; i--) {
      var randomIndex = Math.floor(Math.random() * (i + 1));
      var itemAtIndex = this.cards[randomIndex];
      this.cards[randomIndex] = this.cards[i];
      this.cards[i] = itemAtIndex;
    }
    return this.cards;
  },
  all: function() {
    return this.cards;
  },
  count: function() {
    return this.cards.length;
  }
}, {});

"use strict";
var Deck = function Deck(cards) {
  $traceurRuntime.superConstructor($Deck).call(this, cards);
  this.cards = this.shuffle();
};
var $Deck = Deck;
($traceurRuntime.createClass)(Deck, {draw: function(count) {
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
  }}, {}, CardSlot);

"use strict";
var Dice = function Dice(sides) {
  if (typeof(sides) == "undefined") {
    sides = 20;
  }
  this.sides = sides;
  this.value = this.sides;
};
($traceurRuntime.createClass)(Dice, {roll: function() {
    return this.value = Math.floor((Math.random() * this.sides) + 1);
  }}, {});

"use strict";
var Hand = function Hand() {
  $traceurRuntime.superConstructor($Hand).apply(this, arguments);
  ;
};
var $Hand = Hand;
($traceurRuntime.createClass)(Hand, {addCards: function(cards) {
    for (var card in cards) {
      this.addCard(cards[card]);
    }
  }}, {}, CardSlot);

"use strict";
var Player = function Player(name) {
  this.name = name;
  this.deck = null;
  this.hand = new Hand();
};
($traceurRuntime.createClass)(Player, {
  setDeck: function(deck) {
    this.deck = deck;
  },
  getDeck: function() {
    return this.deck;
  },
  getHand: function() {
    return this.hand;
  }
}, {});

"use strict";
var DebugView = function DebugView() {
  console.info("Setting up the game.");
};
($traceurRuntime.createClass)(DebugView, {
  renderPlayers: function(players) {
    console.info("Rendering players");
    var template = '<% _.each(players, function(player) { %>' + '<fieldset>' + '<legend><%= player.name %></legend>' + '<dl>' + '<dt class="js-deck">deck</dt><dd><%= player.getDeck().count() %></dd>' + '<dt class="js-hand">hand</dt><dd><%= player.getHand().count() %></dd>' + '</dl>' + '</fieldset>' + '<% }); %>';
    $('.js-players').html(_.template(template)({"players": players}));
  },
  renderActivePlayer: function(player) {
    console.info("Player '{0}' will start.".replace('{0}', player.name));
    var $players = $('.js-players fieldset');
    $players.find('legend').css('font-weight', 'normal').css('text-decoration', 'none');
    $players.find('legend:contains("' + player.name + '")').css('font-weight', 'bold').css('text-decoration', 'underline');
  },
  _findPlayerContainer: function(player) {
    return $('.js-players fieldset legend:contains("' + player.name + '")').parent();
  },
  updatePlayer: function(player) {
    console.info("Update player '{0}' view.".replace('{0}', player.name));
    this._findPlayerContainer(player).find('.js-deck').next().html(player.getDeck().count());
    var cards = '';
    ;
    for (var card in player.getHand().all()) {
      cards += ' ' + player.getHand().all()[card].name;
    }
    this._findPlayerContainer(player).find('.js-hand').next().html(player.getHand().count() + '[' + cards + ']');
  }
}, {});

"use strict";
var ViewInterface = function ViewInterface() {
  ;
};
($traceurRuntime.createClass)(ViewInterface, {
  init: function() {},
  setPlayers: function() {}
}, {});
