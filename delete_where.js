const { db } = require('./db/db.js')
const knex = require('knex')(db)

knex.from('productos').where('price', '<', '200').del()
    // Promesas - callbacks
    .then( () => {
        console.log("Productos Eliminados");
    })
    .catch( (err) => { console.log(err); throw err; })
    .finally( () => {
        knex.destroy();
    })