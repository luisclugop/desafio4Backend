const { db } = require('./db/db.js')
const knex = require('knex')(db)

// knex.from('productos').select("producto", "price")
// knex.from('productos').select("producto", "price").orderBy("producto", "desc")
knex.from('productos').select("producto", "price").orderBy("producto", "asc")
    // Promesas - callbacks
    .then( (rows) => {
        console.log(rows);
    })
    .catch( (err) => { console.log(err); throw err; })
    .finally( () => {
        knex.destroy();
    })