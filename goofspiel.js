function processTurn(userid, gameid, card){

  var game = knex("games").select('host_id', 'guest_id', 'host_score', 'guest_score', 'game_state').where('id', gameid);
  var gameState = game.game_state;
  var hostId = game.host_id;
  var guestId = game.guest_id;

  var otherPlayer;

  if (userid === hostId){
    otherPlayer = guestId;
    var hostHand = gameState.hands.host_hand;
    hostHand.splice(hostHand.indexOf(card), 1); //remove card from host hand
    gameState.board.host_card = card;

  } else if (user === guestId){
    otherPlayer = hostId;
    var guestHand = gameState.hands.guest_hand;
    guestHand.splice(guestHand.indexOf(card), 1); //remove card from guest hand
    gameState.board.guest_card = card;

  } else {
    // error out
  }

  var hostCard = gameState.board.host_card;
  var guestCard = gameState.board.guest_card;
  var prizeArray = gameState.board.prize;

  if (hostCard && guestCard){
    //both players have made their turns, do logic

    //find rank of both cards
    var hostRank = hostCard.slice(0,-1);
    var guestRank = guestCard.slice(0,-1);

    var sumPrizes = 0;
    for (prize of prizeArray){
      sumPrizes += Number(prize.slice(0, -1)); //total points to be won this round
    }

    if (hostRank === guestRank){
      //draw: update necessary stuff in the db (prize, turns, etc)

      gameState.board.host_card = null;
      gameState.board.guest_card = null;
      gameState.board.prize.push(gameState.hands.prize.pop());

      knex("games").where("id", gameid).update({whose_turn: userid, game_state: gameState});

    } else {

      // remove played cards from board, flip new prize, update game state
      gameState.board.host_card = null;
      gameState.board.guest_card = null;
      gameState.board.prize = gameState.hands.prize.pop();

      if (hostRank > guestRank){
        //host wins, add score to host, end turn
        knex("games").where("id", gameid).update({whose_turn: userid, game_state: gameState}).increment('host_score', sumPrizes);
      } else {
        //guest wins
        knex("games").where("id", gameid).update({whose_turn: userid, game_state: gameState}).increment('guest_score', sumPrizes);
      }

    }




  } else {
    //wait for other player to make turn
    knex("games").where("id", gameid).update({whose_turn: otherPlayer, game_state: gameState});
  }



}



  // this is the gamestate in the database
  //  {
  //   "board": {
  //     "prize": [],
  //     "host_card" : "",
  //     "guest_card": ""
  //   },
  //   "hands": {
  //     "prize": [],
  //     "host_hand": [],
  //     "guest_hand": []
  //   }
  // }


// game_state: {
//          board: {
//            prize: [],
//            host_card: [],
//            guest_card: []
//          },
//          hands: {
//            prize: ["1D", "2D", "3D", "4D", "5D", "6D", "7D", "8D", "9D", "10D", "11D", "12D", "13D"],
//            host_hand: ["1S", "2S", "3S", "4S", "5S", "6S", "7S", "8S", "9S", "10S", "11S", "12S", "13S"],
//            guest_hand: ["1C", "2C", "3C", "4C", "5C", "6C", "7C", "8C", "9C", "10C", "11C", "12C", "13C"]
//          }
//        }






// {type: 'Goofspiel', host_id: 1, guest_id: 2, status: 'active', result: null, whose_turn: 1, host_score: 0, guest_score: 0, game_state: {
//           board: {
//             prize: [],
//             host_card: [],
//             guest_card: []
//           },
//           hands: {
//             prize: ["1D", "2D", "3D", "4D", "5D", "6D", "7D", "8D", "9D", "10D", "11D", "12D", "13D"],
//             host_hand: ["1S", "2S", "3S", "4S", "5S", "6S", "7S", "8S", "9S", "10S", "11S", "12S", "13S"],
//             guest_hand: ["1C", "2C", "3C", "4C", "5C", "6C", "7C", "8C", "9C", "10C", "11C", "12C", "13C"]
//           }
//         }
//       }

function endGame() {

}
