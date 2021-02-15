
const status = [
    'SEND_EMAILS',
    'NO_EMAILS'
];

exports.up = function(knex) {
    return knex.schema.createTable('clients', table => {
        table.integer('job').unsigned().notNullable();
        table.string('first_name');
        table.string('last_name');
        table.text('email');
        table.boolean('is_recipient');
        table.foreign('job').references('id').inTable('jobs');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('clients');
};
