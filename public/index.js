const socket = io.connect()

let username = sessionStorage.getItem("username");
if(!username) {
    username = prompt("Ingresa mombre de usuario: ");
}

$("#username").html(username)

socket.on('messages', data => {
    console.log(data)
    render(data);
})

function render(data) {
    data.forEach( (info) => {
        $("#messages").prepend(`
            <div>
                <strong>${info.author}</strong>
                <p>${info.texto}</p>
            </div>
        `)
    })
}

$('#myForm').submit(e => {
    e.preventDefault();

    const mensaje = {
        author: username,
        texto: $("#texto").val()
    }

    socket.emit('new-message', mensaje)
    return false
});