const { db } = require('./db/db.js')
const knex = require('knex')(db)

const productos = [
    {
        "producto": "balón",
        "price": 120,
        "thumbnail": "https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/b09b54cc3ea646739d0fac8c0098adbc_9366/balon-de-entrenamiento-con-textura-final-21-20th-anniversary-ucl.jpg"
    },
    {
        "producto": "guantes",
        "price": 250,
        "thumbnail": "https://www.diffusionsport.com/wp-content/uploads/2019/06/guantes_futbol_accesorios_UNO-Premier-GK-PRO-2.jpg"
    },
    {
        "producto": "playera",
        "price": 300,
        "thumbnail": "https://www.dondeir.com/wp-content/uploads/2020/08/madrid-.jpg"
    }
]

knex('productos').insert(productos)
    // Promesas - callbacks
    .then( () => console.log("Productos insertados"))
    .catch( (err) => { console.log(err); throw err; })
    .finally( () => {
        knex.destroy();
    })