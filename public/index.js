const socket = io.connect()
let productos = [];

//Pregunta el nombre, y lo guarda en la session
// let username = sessionStorage.getItem("username");
// if(!username) {
//     username = prompt("Ingresa mombre de usuario: ");
// }

// $("#username").html(username)
//Pregunta el nombre, y lo guarda en la session

// Productos

socket.on('productos', (data) => {
    console.log(data);
    productos.push(data);
    render();
})

fetch('/api/productos')
    .then( response => response.json())
    .then( (data) => {
        productos = data
        console.log(productos)
        render()
    })  

function render(){
    $("#productos").html("")
    for(let item of productos){
        $("#productos").prepend(`
            <tr>
                <td><strong>${item.id}</strong></td>
                <td><strong>${item.producto}</strong></td>
                <td><strong>${item.codigo}</strong></td>
                <td><strong>${item.price}</strong></td>
                <td><img src=${item.thumbnail} style="width: 50px; height: auto;"></img></td>
                <td><strong>${item.stock}</strong></td>
            </tr>
        `)
    }
}

$('#formProductos').submit((e) => {
    e.preventDefault();

    data = {
        // author: username,
        producto: $("#producto").val(),
        codigo: $("#codigo").val(),
        price: $("#price").val(),
        thumbnail: $("#thumbnail").val(),
        stock: $("#stock").val()
    }

    socket.emit('new_producto', data)
    return false
});

// function render(data) {
//     data.forEach( (info) => {
//         $("#productos").prepend(`
//             <div>
//                 <strong>Agrego: ${info.author}</strong>
//                 <p>${info.texto}</p>
//             </div>
//         `)
//     })
// }

// $('#formProductos').submit(e => {
//     e.preventDefault();

//     const product = {
//         author: username,
//         producto: $("#producto").val(),
//         price: $("#price").val(),
//         thumbnail: $("#thumbnail").val()
//     }

//     socket.emit('new-product', product)
//     return false
// });

// Productos




// socket.on('messages', data => {
//     console.log(data)
//     render(data);
// })

// function render(data) {
//     data.forEach( (info) => {
//         $("#messages").prepend(`
//             <div>
//                 <strong>${info.author}</strong>
//                 <p>${info.texto}</p>
//             </div>
//         `)
//     })
// }

// $('#myForm').submit(e => {
//     e.preventDefault();

//     const mensaje = {
//         author: username,
//         texto: $("#texto").val()
//     }

//     socket.emit('new-message', mensaje)
//     return false
// });