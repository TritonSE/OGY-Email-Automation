exports.up = function(knex) {
    return knex.schema.table('jobs', function(table) {
      table.datetime('class_end_time');
    })
  }
  
  exports.down = function(knex) {
    return knex.schema.table('jobs', function(table) {
      table.dropColumn('class_end_time');
    })
  }