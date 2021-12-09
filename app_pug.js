const express = require('express');
const Contenedor = require('./library/Contenedor.js')
const { Router } = express;

const app = express();
// Middelwares express
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.set('views', './views')
app.set('view engine', 'pug')

const router = Router();
const contenedor = new Contenedor(__dirname + "/data/productos.json");
const error = "Producto no encontrado";

router.get("/", (request, response) => {
    return response.json(contenedor.list)
})

//Traer producto por id
// router.get("/:id", (request, response) => {
//     let id = request.params.id
//     return response.json(contenedor.find(id))
// })

router.get("/:id", (request, response) => {
    let id = request.params.id
    return response.json(contenedor.find(id))
    // if (id) {
    //     return response.json(contenedor.find(id))
    // } else {
    //     return response.json({error})
    // }
})

//Insertar un producto por post
router.post("/", (request, response) => {
    let objeto = request.body
    contenedor.insert(objeto)
    console.log("Nuevo producto agregado")
    return response.redirect("/list")
})

//Editar un producto de nuestra lista
router.put("/:id", (request, response) => {
    let objeto = request.body
    let id = request.params.id
    return response.json(contenedor.update(id, objeto))
})

//Elimina un producto de nuestra lista
router.delete("/:id", (request, response) => {
    let id = request.params.id
    return response.json(contenedor.delete(id))
})

app.use('/api/productos', router);
// app.use(express.static('./views'))

app.get("/", (request, response) => {
    return response.render('pug/form.pug')
})

app.get("/list", (request, response) => {
    return response.render('pug/list.pug', {
        list: contenedor.list
    })
})

app.listen(8080);
console.log("Corriendo Pug...")