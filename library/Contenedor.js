const fs = require('fs');

class Contenedor {
    constructor(filename = "productos.json") {
        this.id = 0;
        this.list = [];
        this.filename = filename;

        this.init();
    }

    init() {
        console.log(`Loading ${this.filename} ...`)
        const data = fs.readFileSync(this.filename)
        const listaFromFile = JSON.parse(data)

        for(const objeto of listaFromFile) {
            this.insert(objeto);
        }
        console.log(`File loaded.`)
    }

    find(id) {
        return this.list.find( (objeto) => objeto.id == id)
    }

    insert(objeto) {
        objeto.id = ++this.id;
        this.list.push(objeto);
        return objeto
    }

    update(id, objeto) {
        const index = this.list.findIndex( (objetoActualizar) => objetoActualizar.id == id)
        objeto.id = this.list[index].id
        this.list[index] = objeto

        return objeto;
    }

    delete(id) {
        const indexDelete = this.list.findIndex( (objetoEliminar) => objetoEliminar.id == id)
        this.list.splice(indexDelete, 1);

        return this.list;
    }
}

module.exports = Contenedor;