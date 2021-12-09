const express = require('express');
const handlebars = require("express-handlebars")
const Contenedor = require('./library/Contenedor.js')
const { Router } = express;

const app = express();
// Middelwares express
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.engine(
    "handlebars",
    handlebars.engine()
)

app.set('views', './views')
app.set('view engine', 'handlebars')

const router = Router();
const contenedor = new Contenedor(__dirname + "/data/productos.json");
const error = "Producto no encontrado";

router.get("/", (request, response) => {
    return response.json(contenedor.list)
})

router.get("/:id", (request, response) => {
    let id = request.params.id
    return response.json(contenedor.find(id))
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
    return response.render('handlebars/form.handlebars')
})

app.get("/list", (request, response) => {
    return response.render('handlebars/list.handlebars', {
        list: contenedor.list, showList: true
    })
})

app.listen(8080);
console.log("Corriendo Handlebars...")

// app.engine('.pan', function(filePath, options, callback) {
//     fs.readFile(filePath, function(error, content) {
//         if(error) return callback(new Error(error))

//         const rendered = content.toString()
//                                 .replace('#titulo', options.titulo + '')
//                                 .replace('#mensaje', options.mensaje + '')
//         return callback(null, rendered)
//     })
// })

// app.set('view', './views')
// app.set('view engine', 'pan')
// Creando motor de plantilla Handlebars ------------

// app.get("/", (request, response) => {

//     const objeto = {
//         titulo: request.query.titulo,
//         mensaje: request.query.mensaje
//     }
//     response.render('index.pan', objeto)
// })

// app.listen(8080);
// console.log("Corriendo Handlebars...")