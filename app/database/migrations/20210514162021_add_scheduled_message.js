
exports.up = function(knex) {
    return knex.schema.table('jobs', function(table){
        table.text('scheduled_message')
    });
};

exports.down = function(knex) {
    return knex.schema.table('jobs',function(table){
        table.dropColumn('scheduled_message');
    });
};
