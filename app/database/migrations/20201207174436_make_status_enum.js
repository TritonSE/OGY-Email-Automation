
const status = [
    'SCHEDULED',
    'ON_PROCESS',
    'SUCCESS',
    'FAIL'
];

exports.up = function(knex) {
    return knex.schema.table('jobs', (tbl) => {
        tbl.enum('status', status, {useNative: true, enumName:'status_enum'}).notNullable().index();
    });
};


exports.down = function(knex) {
    return knex.schema.table('jobs', (tbl) => {
       tbl.dropColumn('status'); 
    });
};
