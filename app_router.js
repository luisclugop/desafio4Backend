const express = require('express');
const { Router } = express;
const Contenedor = require('./library/Contenedor.js')
const DB = new Contenedor('productos')

// Conexion Server por Socket
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const app = express();
const router = Router();
const error = "Producto no encontrado";

// Constantes Server Socket
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
// Constantes Server Socket

app.use(express.static('./public'));
app.use('/api/productos', router);

// Inicializar Base de datos
DB.init();
app.get('/', (request, response) => {
    response.sendFile('index.html', {root: __dirname})
})

// Middelwares express
router.use(express.json());
router.use(express.urlencoded({
    extended: true
}));

// Vistas
// app.set('views', './views');
// app.set('view engine', 'handlebars');

// Logica Router

router.get('/', async (request, response) =>{
    const elements = await DB.getAll()
    console.log(elements)
    response.send(JSON.stringify(elements))
})

// router.get("/", (request, response) => {
//     return response.json(contenedor.list)
// })

// router.get("/", (request, response) => {
//     const elements = contenedor.getAll()
//     return response.send(JSON.stringify(elements))
// })

router.get("/:id", (request, response) => {
    let id = request.params.id
    if(id) {
        return response.json(contenedor.find(id))
    } else {
        return error
    }
})

//Insertar un producto por post
// router.post("/", (request, response) => {
//     let objeto = request.body
//     contenedor.insert(objeto)
//     console.log("Nuevo producto agregado")
//     return response.redirect("/")
// })

router.post('/', async (request, response) =>{
    console.log(request.body)
    const result = await DB.save(request.body)
    response.send(JSON.stringify(result))
})

//Editar un producto de nuestra lista
// router.put("/:id", (request, response) => {
//     let objeto = request.body
//     let id = request.params.id
//     return response.json(contenedor.update(id, objeto))
// })

//Elimina un producto de nuestra lista
// router.delete("/:id", (request, response) => {
//     let id = request.params.id
//     return response.json(contenedor.delete(id))
// })

router.delete('/:id', async (request,response) =>{
    console.log(request.body)
    const result = await DB.deleteById(request.params.id)
    response.send(JSON.stringify(result))
})

// app.use('/api/productos', router);
// app.use(express.static('./views'))


// app.get("/", (request, response) => {
//     return response.render('form.ejs')
// })

// app.get("/", (request, response) => {
//     return response.render('productos.handlebars')
// })

// app.get("/", (request, response) => {
//     return response.render('handlebars/productos.handlebars', {
//         list: contenedor.list, showList: true
//     })
// })

// app.get("/list", (request, response) => {
//     return response.render('ejs/list.ejs', {
//         list: contenedor.list
//     })
// })

// app.get("/", (request, response) => {
//     return response.render('ejs/list.ejs', {
//         list: contenedor.list
//     })
// })

// app.listen(8080);
// console.log("Corriendo EJS...")

httpServer.listen(8080, function() {
    console.log("Corriendo IOServer")
})

// io.on("connection", (socket) => {
//     console.log("Nuevo usuario")
//     socket.emit('contenedor', contenedor)
// })

io.on("connection", (socket) => {
    // Escuchamos la peticion del index.js en public
    // console.log(data)
    console.log("Nuevo usuario")
    socket.on('new_producto', async (data) => {
        console.log(data)
        await DB.save(data)
        io.sockets.emit('productos', data)
    })
})