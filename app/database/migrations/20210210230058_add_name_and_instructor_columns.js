
exports.up = function(knex) {
    knex.schema.table('jobs', function(table){
        table.string('class_name');
        table.string('instructor_first');
        table.string('instructor_last');
  })
};

exports.down = function(knex) {
    knex.scheme.table('jobs',function(table){
        table.dropColumn('class_name');
        table.dropColumn('instructor_first');
        table.dropColumn('instructor_last')
    })
};
