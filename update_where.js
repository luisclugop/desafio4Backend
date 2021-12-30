const { db } = require('./db/db.js')
const knex = require('knex')(db)

// knex.from('productos').select("producto", "price")
// knex.from('productos').select("producto", "price").orderBy("producto", "desc")
knex.from('productos')
    .where('price', '<', '200')
    .update({price: 100})
    // Promesas - callbacks
    .then( () => {
        console.log("Productos modificados");
    })
    .catch( (err) => { console.log(err); throw err; })
    .finally( () => {
        knex.destroy();
    })