
exports.up = function(knex) {
    return knex.schema.createTable('clients', table => {
        table.increments('id').unique().notNullable();
        table.string('first_name');
        table.string('last_name');
        table.text('email');
        table.boolean('is_recipient').defaultTo(true);
        table.integer('job_id').unsigned().references('id').inTable('jobs');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('clients');
};
