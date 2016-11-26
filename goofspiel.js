const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  //this will probably get removed
  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .then((results) => {
        res.json(results);
    });
  });


//i don't know let's just do stuff


/// this is the object nathan wants back

// {
//      opponent_card_count: 13, // contain the number of cards that the opponent has
//      hand: hand, // contain only the local players cards as an array
//      board: {
//        prize: prize,
//        host_card: '',
//        guest_card: ''
//      }
// }

function processTurn(body){
  var userId = body.user_id;

  var game = knex("games").select('host_id', 'guest_id', 'game_state').where('id', body.game_id);
  var gameState = game.game_state;
  var hostId = game.host_id;
  var guestId = game.guest_id;

  var user;
  var otherPlayer;

  if (userId === hostId){
    user = "host";
    otherPlayer = guestId;
    var hostHand = gameState.hands.host_hand;
    hostHand.splice(hostHand.indexOf(body.card), 1); //remove card from host hand
    gameState.board.host_card = body.card;

  } else if (user === guestId){
    user = "guest";
    otherPlayer = hostId;
    var guestHand = gameState.hands.guest_hand;
    guestHand.splice(guestHand.indexOf(body.card), 1); //remove card from host hand
    gameState.board.guest_card = body.card;

  } else {
    user = "nobody";
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

    if (hostRank > guestRank){
      //host wins, add score to host, end turn
      knex("games").where("id", body.game_id).update({whose_turn: userId, game_state: gameState});

    }
    if (hostRank === guestRank){
      //draw: update necessary stuff in the db (prize, turns, etc)
    }



  } else {
    //wait for other player to make turn
    knex("games").where("id", body.game_id).update({whose_turn: otherPlayer, game_state: gameState});
    //render ???
  }

  //body has game_id, user_id, card

  //queries the database to see if other party played turn

  //if both have played, compare to see who wins and add scores to running total

    //if draw, pull another prize card, wait for players to select cards again


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


}



function setBoard(){


 }


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


function loadTurn(){

}

function initializeGame(user_id){

}




  return router;
}
