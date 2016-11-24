
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('games').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('games').insert({id: 1, type: 'Goofspiel', host_id: 1, guest_id: 2, status: 'active', result: null, whos_turn: 1, host_score: 0, guest_score: 0, state: {
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
