const { db } = require('./db/db.js')
const knex = require('knex')(db)

knex.from('productos').select("*")
    // Promesas - callbacks
    .then( (rows) => {
        for(const row of rows) {
            console.log(`${row['id']}, ${row['producto']}, ${row['price']}`);
        }
    })
    .catch( (err) => { console.log(err); throw err; })
    .finally( () => {
        knex.destroy();
    })