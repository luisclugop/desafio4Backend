const { db } = require('./db/db.js')
const knex = require('knex')(db)

knex.from('productos').del()
    // Promesas - callbacks
    .then( () => {
        console.log("Productos Eliminados");
    })
    .catch( (err) => { console.log(err); throw err; })
    .finally( () => {
        knex.destroy();
    })