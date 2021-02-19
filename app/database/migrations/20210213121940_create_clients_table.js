
exports.up = function(knex) {
    return knex.schema.createTable('clients', table => {
        table.integer('job').unsigned().notNullable();
        table.string('first_name');
        table.string('last_name');
        table.text('email');
        table.boolean('is_recipient').defaultTo(true);
        table.foreign('job_id').references('id').inTable('jobs');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('clients');
};
