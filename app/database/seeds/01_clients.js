exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('clients').del()
    .then(function () {
      // Inserts seed entries
      return knex('clients').insert([
        {
          id: 1,
          first_name: 'Elias',
          last_name: 'Fang',
          email: 'efang@ucsd.edu',
          is_recipient: true
        },
        {
          id: 2,
          first_name: 'Shravan',
          last_name: 'Konduru',
          email: 'skonduru@ucsd.edu',
          is_recipient: false
        },
        {
          id: 3,
          first_name: 'Jacob',
          last_name: 'Au',
          email: 'jtau@ucsd.edu',
          is_recipient: false
        }
      ]);
    });
};
