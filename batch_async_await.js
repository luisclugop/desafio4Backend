const { db } = require('./db/db.js')
const knex = require('knex')(db)

// const productos = [
//     {
//         "producto": "balón",
//         "price": 120,
//         "thumbnail": "https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/b09b54cc3ea646739d0fac8c0098adbc_9366/balon-de-entrenamiento-con-textura-final-21-20th-anniversary-ucl.jpg"
//     },
//     {
//         "producto": "guantes",
//         "price": 250,
//         "thumbnail": "https://www.diffusionsport.com/wp-content/uploads/2019/06/guantes_futbol_accesorios_UNO-Premier-GK-PRO-2.jpg"
//     },
//     {
//         "producto": "playera",
//         "price": 300,
//         "thumbnail": "https://www.dondeir.com/wp-content/uploads/2020/08/madrid-.jpg"
//     }
// ];

(async () => {
    try {
        console.log("Creamos tabla");
        // Creamos la tabla
        knex.schema.createTable('productos', (producto) => {

            // Aqui se pone la configuracion de la tabla
            producto.increments('id')
            producto.string('producto', 20)
            producto.string('codigo', 10)
            producto.float('price')
            producto.string('thumbnail')
            producto.integer('stock')
            producto.timestamps('stock')
        
        })
            // Promesas - callbacks
            .then( () => console.log("Tabla creada"))
            .catch( (err) => { console.log(err); throw err; })
            .finally( () => {
                knex.destroy();
            })

        // Insertar 1 Producto
        console.log("--> Insertemos productos");
        await knex("productos").insert([
            { producto: 'Porteria', codigo: "000001", price: 400, thumbnail: "aaaaa", stock: 10  },
            { producto: 'Espinilleras', codigo: "000002", price: 300, thumbnail: "bbbbb", stock: 15  },
            { producto: 'Calcetas', codigo: "000003", price: 100, thumbnail: "ccccc", stock: 8  }
        ])

        // Leer los Productos
        console.log("--> Leer todos los productos")
        let rows = await knex.from("productos").select("*")
        for(const r of rows) {
            console.log(`${r.id}, ${r.producto}, ${r.price}`);
        }

        // Eliminar solo 1
        console.log("--> Borramos productos con id 3")
        await knex.from("productos").where('id', 3).del()

        // Actualizamos los productos
        console.log("--> Actualizamos los productos")
        await knex.from('productos').where('id', 2).update({stock: 0})

        // // Eliminar todos
        // console.log("--> Borramos todos")
        // await knex("productos").del()

        // // Insertamos los Productos
        // console.log("Insertamos los productos")
        // await knex("productos").insert(productos)

        // // Leer los Productos
        // console.log("--> Leer todos los productos")
        // let rows = await knex.from("productos").select("*")
        // for(const r of rows) {
        //     console.log(`${r.id}, ${r.producto}, ${r.price}`);
        // }

        // Insertar 1 Producto
        // console.log("--> Insertemos solo 1 producto");
        // await knex("productos").insert({ producto: 'Porteria', price: 400 })

        // Leer los Productos con los datos actualizados
        console.log("--> Leer todos los productos con los datos actualizados")
        rows = await knex.from("productos").select("*")
        for(const r of rows) {
            console.log(`${r.id}, ${r.producto}, ${r.price}`);
        }

    } catch(err) {
        console.log(err);
    } finally {
        knex.destroy();
    }
})()