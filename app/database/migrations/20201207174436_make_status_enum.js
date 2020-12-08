
const status = [
    'SCHEDULED',
    'ON_PROCESS',
    'SUCCESS',
    'FAIL'
];

exports.up = function(knex) {
    return knex.schema.table('jobs', (tbl) => {
        tbl.string('status');
    })
    .then(()=> knex('jobs').insert(status.map((stat) => ({ stat }))));
};
exports.down = function(knex) {
    return knex.schema.table('jobs', (tbl) => {
       tbl.dropColumn('status'); 
    });
};
