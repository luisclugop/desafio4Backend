const express = require("express")

const app = express();

app.set('views', './views')
app.set('view engine', 'ejs')

app.get("/", (request, response) => {
    response.render('ejs/mensaje.ejs', {
        mensaje: "Hola Luis con ejs"
    })
})

app.get("/datos", (request, response) => {
    let { min, max, nivel, titulo } = request.query;

    return response.render('ejs/datos.ejs', {
        min, max, nivel, titulo
    })
})


app.listen(8080);
console.log("Corriendo ejs...")