const mongoose = require("../../config/bd_mongo");
require("../../../models/listaAmigos");
const ListaAmigos = mongoose.model('listaAmigos');
const UserDao = require("./user-dao");
const { timeout } = require("async");
const { json } = require("body-parser");

class ListaAmigosDao {


    novo(lista) {
        return new ListaAmigos(lista).save()
    }

    atualizar(parametro, update) {
        return ListaAmigos.findByIdAndUpdate(parametro, update)
    }

    mostrarQuando(parametro) {
        return ListaAmigos.find(parametro)
        // .then(doc => {
        //     return doc.length;
        // }).catch(err => {
        //     return err
        // })
    }
}

module.exports = ListaAmigosDao;


