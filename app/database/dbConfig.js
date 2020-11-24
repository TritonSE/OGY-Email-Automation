const knex = require('knex');

const db = process.eng.DB_ENV || 'development';

const knexConfig = require('../../knexfile.js')[db];

module.exports = knex(knexConfig);
