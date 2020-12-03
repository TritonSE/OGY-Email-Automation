const db = require('../database/dbConfig.js')

async function insertJob(job){
    try {
        await db('jobs')
        .insert(job)
    }catch(e){
        console.error("Error: failed to insert job", e)
    }
}

module.exports = {
    insertJob
};