// var spades = [ {rank: "ace", suit: "spades"}, {rank: "2", suit: "spades"},{rank: "3", suit: "spades"},{rank: "4", suit: "spades"},{rank: "5", suit: "spades"},{rank: "6", suit: "spades"},{rank: "7", suit: "spades"},{rank: "8", suit: "spades"},{rank: "9", suit: "spades"},{rank: "10", suit: "spades"},{rank: "jack", suit: "spades"},{rank: "queen", suit: "spades"},{rank: "king", suit: "spades"}]

function cardElement(cardObj) {
  const rank = cardObj.rank;
  const suit = cardObj.suit.toLowerCase();
  const suitInitial = suit.substr(0, 1).toUpperCase()

  return `
    <span class="card">
      <img class="${rank}${suitInitial}" src="/images/${rank}_of_${suit}.png" />
    </span>
  `
}

function player(cards) {
  cards = cards.map(function(card) {
    var info = card.split(":");
    var rank = info[0];
    var suit = info[1];

    var lookup = {
      "S": "spades",
      "D": "diamonds",
      "H": "hearts",
      "C": "clubs"
    }

    return { rank: rank, suit: lookup[suit] }
  });

  cards.forEach (function(card) {
    var player = cardElement(card)
    $('.player').append(player)
  });

}

function opponent(count) {
  var cards = [];

  for(var i = 0; i < count; i += 1) {
    cards.push({rank: "card", suit: "back"});
  }

  cards.forEach (function(card) {
    var backs = cardElement(card);
    $('.opponent').append(backs);
  });
}

function render(data) {
  $('.player').empty();
  $('.opponent').empty();

  player(data.hand);
  opponent(data.opponent_card_count);
}

$(function() {

  // remove when api is available
  // GET /games/:id

  function getData() {
    var hand = [];

    for(var i = 1; i < 14; i += 1) {
      hand.push(i + ":S");
    }

    return {
      opponent_card_count: 8, // contain the number of cards that the opponent has
      hand: hand, // contain only the local players cards as an array
      board: {
        prize: ["4D"],
        host_card: '',
        guest_card: ''
      }
    }
  }

  // $.ajax({
  //   url: "/games/:game_id",
  //   method: "GET"
  // }).success(function(data) {
  //   render(data);
  // })

  render(getData());

});

