gameState = {
  id: 0,
  host_id: 0,
  player_card: ""
}





function cardElement(cardObj) {
  const rank = cardObj.rank;
  const suit = cardObj.suit.toLowerCase();
  const suitInitial = suit.substr(0, 1).toUpperCase()

  return `
      <img  class="${rank}${suitInitial} card"
            data-rank="${rank}"
            data-suit="${suit}"
            data-cardid="${rank}${suitInitial}"
            src="/images/${rank}_of_${suit}.png" />

  `
}

function player(cards) {
  cards = cards.map(function(card) {
    var rank = card.slice(0,-1);
    var suit = card.slice(-1)

    var lookup = {
      "S": "spades",
      "D": "diamonds",
      "H": "hearts",
      "C": "clubs"
    }

    return { rank: rank, suit: lookup[suit] }
  });


  cards.forEach(function(card) {
    var player = cardElement(card)
    $('.player').append(player)
  });

}

function prize(cards) {
  cards = cards.map(function(card) {
    var rank = card.slice(0,-1);
    var suit = card.slice(-1)

    var lookup = {
      "S": "spades",
      "D": "diamonds",
      "H": "hearts",
      "C": "clubs"
    }
    return { rank: rank, suit: lookup[suit] }
  });

  cards.forEach(function(card) {
    var prize = cardElement(card)
    $('.prize').append(prize);
  });
};






function opponent(count) {
  var cards = [];

  for (var i = 1; i <= count; i += 1) {
    cards.push({ rank: i, suit: "back" });
  }

  cards.forEach(function(card) {
    var backs = cardElement(card);
    $('.opponent').append(backs);
  });
}


function render(data) {
  $('.player').empty();
  $('.opponent').empty();
  $('.prize').empty();

  player(data.hand);
  opponent(data.opponent_card_count);
  prize(data.board.prize);
  console.log(data)
}

$(function() {

  // remove when api is available
  // GET /games/:id

  // function getData() {
  //   var hand = [];
  //   var prize = [];

  //   for(var i = 1; i < 14; i += 1) {
  //     hand.push(i + ":S");
  //   }
  //   for(var j = 1; j < 2; j += 1) {
  //     prize.push(j + ":D");
  //   }

  //   return {
  //     opponent_card_count: 13, // contain the number of cards that the opponent has
  //     hand: hand, // contain only the local players cards as an array
  //     board: {
  //       prize: prize,
  //       host_card: '',
  //       guest_card: ''
  //     }
  //   }
  // }

  function GetGame(url) {

    var game_url = window.location.pathname + "/state"
    console.log(game_url);

    $.ajax({
<<<<<<< HEAD
      url: "/game/"+ url +"/state",
=======
      url: game_url,
>>>>>>> 1c29a9740e39eee5abab02841ad83514c79edece
      method: "GET"}).done(
      function(data) {
        render(data);
      });
    }





  GetGame(16);
  setTimeout(dealCards, 100);
  setTimeout(dealOpponentCards, 900);
  setTimeout(dealPrize, 2250);

  $(document).on('click', '.player .card', function() {
    $(this).css('left', '405px');
    $(this).css('top', '250px');
    gameState.player_card = ($(this).data('cardid'))
    console.log(gameState)
    $(document).off('click', '.player .card')

  });







});












function dealCards() {
  $('.player .card').each(function() {

    var distFromLeft = ($(this).data('rank') - 1) * ($(this).width() + 5);
    $(this).css('left', `${distFromLeft}px`);
  });

}

function dealOpponentCards() {
  $('.opponent .card').each(function() {

    var distFromLeft = ($(this).data('rank') - 1) * ($(this).width() + 5);
    $(this).css('left', `${distFromLeft}px`);
  });

}

function dealPrize() {
  $('.prize .card').each(function() {

    var distFromLeft = $(this).data('rank') * ($(this).width() -82) + 550
    $(this).css('left', `${distFromLeft}px`);
  });

}
