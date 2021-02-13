
exports.up = function(knex) {
    return knex.schema.createTable('clients', table => {
        table.integer('job').unsigned().notNullable();
        table.string('first_name');
        table.string('last_name');
        table.string('email', 320);

        table.foreign('job').references('id').inTable('jobs');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('clients');
};
