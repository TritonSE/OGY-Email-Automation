
exports.up = function(knex) {
    knex.schema.table('jobs', function(table){
        tbl.string('class_name');
        tbl.string('instructor_first_name');
        tbl.string('instructor_last_name');
  })
};

exports.down = function(knex) {
    knex.scheme.table('jobs',function(table){
        table.dropColumn('class_name');
        table.dropColumn('instructor_first_name');
        table.dropColumn('instructor_last_name');
    })
};
