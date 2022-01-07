// const fs = require('fs');
// const { db } = require('./db/db.js')
const { db } = require('../db/db')

class Contenedor {
    constructor(table_name) {
        this.table = table_name
        this.knex = require('knex')(db)
    }

    async init(){
        await this.knex.schema.createTableIfNotExists(this.table, table => {
            table.increments()
            table.string('producto', 15)
            table.string('codigo', 8)
            table.float('price')
            table.string('thumbnail', 50)
            table.float('stock', 5)
            
        })
    }

    async save(objeto){
        try{
            return await this.knex(this.table).insert([objeto])
        }
        catch(err){
            return `Ha ocurrido un error al guardar los datos en la database ${err}`
        }
    }

    async getById(id){
        try{
            return await this.knex.from(this.table).select("*").where('id', id).limit(1)
        }
        catch(err){
            return `Hubo un error al buscar el elemento ${err}`
        }
    }

    async getAll(){
        try{
            return await this.knex.from(this.table).select("*")
        }
        catch(err){
            return `Hubo un error al buscar todos los elementos ${err}`
        }
    }

    async deleteById(id){
        try{
            return await this.knex(this.table).where('id', id).del()
        }
        catch(err){
            return `Hubo un error al eliminar el elemento ${err}`
        }
    }
}

module.exports = Contenedor;