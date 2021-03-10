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


  /**
 * Inserts a job into the database.
 * Adds clients who are attending the class.
 *
 * @param jobs
 * @returns {Promise<void>}
 */
async function insert(jobs){
  await jobs.forEach(async function(job){
      if(job === undefined){
          return;
      }
      await db.transaction(async function(trx) {
          try {
              const clients = job.clients;
              const job_entry = {
                  class_id : job.class_id,
                  scheduled_time : job.scheduled_time,
                  class_end_time : job.class_end_time,
                  status : job.status,
                  job_hash : job.job_hash,
                  class_name : job.class_name,
                  instructor_first_name : job.instructor_first_name,
                  instructor_last_name : job.instructor_last_name
              };
              const job_id = await db('jobs')
                  .insert(job_entry, ['id'])
                  .transacting(trx);
              await clients.forEach(async function(client) {
                  client.job_id = job_id[0];
              });
              await db('clients')
                  .insert(clients)
                  .transacting(trx);
              await trx.commit();
          } catch (err) {
              console.error(err, 'Failed to insert job and clients.');
              await trx.rollback();
          }
      });
  });
}

/**
 * Updates scheduled_time for jobs in the database with the same class_id.
 * Adds new clients attending the section and removes clients no longer attending
 *
 * @param filter
 * @param updatedJob
 * @returns {Promise<void>}
 */
async function update(filter, job){
  await db.transaction(async function(trx) {
      try {
          const clients = job.clients;
          const jobEntry = {
              class_id : job.class_id,
              scheduled_time : job.scheduled_time,
              class_end_time : job.class_end_time,
              status : job.status,
              class_name : job.class_name,
              instructor_first_name : job.instructor_first_name,
              instructor_last_name : job.instructor_last_name
          }
          await db('jobs')
                .where(filter)
                .update(jobEntry)
                .transacting(trx);
          const jobId = (await get(filter))[0].id;
          const storedClients = await db('clients')
                                      .select('email')
                                      .where('job_id', jobId)
                                      .transacting(trx);
          const storedClientsEmails = await Promise.all(storedClients.map(client => client.email));
          const clientEdits = await clientProcessing.findClientDifference(clients, storedClientsEmails, jobId);
          const addClients = clientEdits[0], removeEmails = clientEdits[1];
          await db('clients')
              .where('job_id', jobId)
              .andWhere('email', 'in', removeEmails)
              .del()
              .transacting(trx);
          await db('clients')
              .insert(addClients)
              .transacting(trx);
          await trx.commit();
      } catch(err){
          console.error("Error: failed to update jobs", err);
          await trx.rollback();
      }
  });
}
