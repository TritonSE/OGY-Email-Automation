
exports.up = function(knex) {
    return knex.schema.table('jobs', function(table){
        table.integer('class_schedule_id').unsigned().notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.table('jobs',function(table){
        table.dropColumn('class_schedule_id');
    })
};
