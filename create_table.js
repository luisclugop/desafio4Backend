const { db } = require('./db/db.js')
const knex = require('knex')(db)

knex.schema.createTable('productos', (producto) => {

    // Aqui se pone la configuracion de la tabla
    producto.increments('id')
    producto.string('producto')
    producto.integer('price')
    producto.string('thumbnail')

})
    // Promesas - callbacks
    .then( () => console.log("Tabla creada"))
    .catch( (err) => { console.log(err); throw err; })
    .finally( () => {
        knex.destroy();
    })