
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('games').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('games').insert({type: 'Goofspiel', host_id: 1, guest_id: 2, status: 'active', result: null, whose_turn: 1, host_score: 0, guest_score: 0, game_state: {
          board: {
            prize: [],
            host_card: [],
            guest_card: []
          },
          hands: {
            prize: ["1D", "2D", "3D", "4D", "5D", "6D", "7D", "8D", "9D", "10D", "11D", "12D", "13D"],
            host_hand: ["1S", "2S", "3S", "4S", "5S", "6S", "7S", "8S", "9S", "10S", "11S", "12S", "13S"],
            guest_hand: ["1C", "2C", "3C", "4C", "5C", "6C", "7C", "8C", "9C", "10C", "11C", "12C", "13C"]
          }
        }
      }),
        knex('games').insert({type: 'Goofspiel', host_id: 1, guest_id: 3, status: 'active', result: null, whose_turn: 1, host_score: 0, guest_score: 0, game_state: {
          board: {
            prize: [],
            host_card: [],
            guest_card: []
          },
          hands: {
            prize: ["1D", "2D", "3D", "4D", "5D", "6D", "7D", "8D", "9D", "10D", "11D", "12D", "13D"],
            host_hand: ["1S", "2S", "3S", "4S", "5S", "6S", "7S", "8S", "9S", "10S", "11S", "12S", "13S"],
            guest_hand: ["1C", "2C", "3C", "4C", "5C", "6C", "7C", "8C", "9C", "10C", "11C", "12C", "13C"]
          }
        }
      }),
        knex('games').insert({type: 'Goofspiel', host_id: 2, guest_id: 3, status: 'active', result: null, whose_turn: 2, host_score: 0, guest_score: 0, game_state: {
          board: {
            prize: [],
            host_card: [],
            guest_card: []
          },
          hands: {
            prize: ["1D", "2D", "3D", "4D", "5D", "6D", "7D", "8D", "9D", "10D", "11D", "12D", "13D"],
            host_hand: ["1S", "2S", "3S", "4S", "5S", "6S", "7S", "8S", "9S", "10S", "11S", "12S", "13S"],
            guest_hand: ["1C", "2C", "3C", "4C", "5C", "6C", "7C", "8C", "9C", "10C", "11C", "12C", "13C"]
          }
        }
      }),
        knex('games').insert({type: 'Goofspiel', host_id: 3, guest_id: 1, status: 'active', result: null, whose_turn: 3, host_score: 0, guest_score: 0, game_state: {
          board: {
            prize: [],
            host_card: [],
            guest_card: []
          },
          hands: {
            prize: ["1D", "2D", "3D", "4D", "5D", "6D", "7D", "8D", "9D", "10D", "11D", "12D", "13D"],
            host_hand: ["1S", "2S", "3S", "4S", "5S", "6S", "7S", "8S", "9S", "10S", "11S", "12S", "13S"],
            guest_hand: ["1C", "2C", "3C", "4C", "5C", "6C", "7C", "8C", "9C", "10C", "11C", "12C", "13C"]
          }
        }
      }),
        knex('games').insert({type: 'Goofspiel', host_id: 3, guest_id: 2, status: 'active', result: null, whose_turn: 3, host_score: 1, guest_score: 12, game_state: {
          board: {
            prize: ["3D"],
            host_card: [],
            guest_card: ["7C"]
          },
          hands: {
            prize: ["1D", "2D", "4D", "5D", "6D", "7D", "8D", "9D", "10D", "11D"],
            host_hand: ["1S", "2S", "3S", "4S", "5S", "6S", "7S", "8S", "11S", "12S", "13S"],
            guest_hand: ["1C", "2C", "3C", "4C", "8C", "9C", "10C", "11C", "12C", "13C"]
          }
        }
      }),
        knex('games').insert({type: 'Goofspiel', host_id: 2, guest_id: 1, status: 'active', result: null, whose_turn: 2, host_score: 21, guest_score: 2, game_state: {
          board: {
            prize: ["4D", "10D"],
            host_card: ["1S"],
            guest_card: []
          },
          hands: {
            prize: ["10D", "11D", "9D", "12D", "13D"],
            host_hand: ["2S", "3S", "11S", "12S"],
            guest_hand: ["1C", "4C", "5C", "6C", "10C"]
          }
        }
      }),
    ]);
  });
};
