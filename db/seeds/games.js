
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('games').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('games').insert({id: 1, type: 'Goofspiel', host_id: 1, guest_id: 2, status: 'active', result: null, whose_turn: 1, host_score: 0, guest_score: 0, state: {
          board: {
            prize: [],
            host_card: '',
            guest_card: ''
          },
          hands: {
            prize: [],
            host_hand: [],
            guest_hand: []
          }
        }
      }),
        knex('games').insert({id: 2, type: 'Goofspiel', host_id: 1, guest_id: 3, status: 'active', result: null, whose_turn: 1, host_score: 0, guest_score: 0, state: {
          board: {
            prize: [],
            host_card: '',
            guest_card: ''
          },
          hands: {
            prize: [],
            host_hand: [],
            guest_hand: []
          }
        }
      }),
        knex('games').insert({id: 3, type: 'Goofspiel', host_id: 2, guest_id: 3, status: 'active', result: null, whose_turn: 2, host_score: 0, guest_score: 0, state: {
          board: {
            prize: [],
            host_card: '',
            guest_card: ''
          },
          hands: {
            prize: [],
            host_hand: [],
            guest_hand: []
          }
        }
      }),
        knex('games').insert({id: 4, type: 'Goofspiel', host_id: 3, guest_id: null, status: 'active', result: null, whose_turn: 3, host_score: 0, guest_score: 0, state: {
          board: {
            prize: [],
            host_card: '',
            guest_card: ''
          },
          hands: {
            prize: [],
            host_hand: [],
            guest_hand: []
          }
        }
      }),
      ]);
    });
};
