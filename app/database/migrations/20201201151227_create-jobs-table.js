
exports.up = function(knex) {
    return knex.schema.createTable('jobs', tbl => {
        tbl.increments('id').unique().notNullable();
        tbl.integer('class_id').unsigned().notNullable();
        tbl.timestamps(true, true); // creates 'created_at' and 'update_at' columns (useTimestamps = true, defaultToNow = true)
        tbl.datetime('scheduled_time');
        tbl.text('job_hash');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('jobs');
};
