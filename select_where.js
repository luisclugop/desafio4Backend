const { db } = require('./db/db.js')
const knex = require('knex')(db)

// knex.from('productos').select("producto", "price")
knex.from('productos').select("producto", "price").where('price', '>', '200')
    // Promesas - callbacks
    .then( (rows) => {
        console.log(rows);
    })
    .catch( (err) => { console.log(err); throw err; })
    .finally( () => {
        knex.destroy();
    })