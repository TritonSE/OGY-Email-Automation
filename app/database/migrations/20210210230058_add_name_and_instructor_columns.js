
exports.up = function(knex) {
    return knex.schema.table('jobs', function(table){
        table.string('class_name');
        table.string('instructor_first_name');
        table.string('instructor_last_name');
  })
};

exports.down = function(knex) {
    return knex.schema.table('jobs',function(table){
        table.dropColumn('class_name');
        table.dropColumn('instructor_first_name');
        table.dropColumn('instructor_last_name');
    })
};
