
exports.up = function(knex) {
    return knex.schema.createTable('jobs', tbl => {
        tbl.increments('id').unique().nonNullable();
        tbl.integer('class_id').unsigned().nonNullable();
        tbl.timestamps(true, true); // creates 'created_at' and 'update_at' columns (useTimestamps = true, defaultToNow = true)
        tbl.datetime('scheduled_time');
        // TODO: @Arnav add status(enum)
        tbl.text('job_hash');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('jobs');
};
