exports.up = function(knex) {
    knex.schema.table('jobs', function(table) {
      table.datetime('class_end_time');
    })
  }
  
  exports.down = function(knex) {
    knex.schema.table('jobs', function(table) {
      table.dropColumn('class_end_time');
    })
  }