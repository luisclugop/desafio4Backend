const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const app = express()

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.static('./public'))

const messages = [
    { author: "Luis", texto: "Mensaje de Luis" },
    { author: "Carlos", texto: "Mensaje de Carlos" }
]

httpServer.listen(8080, function() {
    console.log("Corriendo IOServer")
})

io.on("connection", (socket) => {
    console.log("Nuevo usuario")
    socket.emit('messages', messages)

    socket.on('new-message', (data) => {
        messages.push(data);
        io.sockets.emit('messages', [data])
    })
})