const mongoose = require("../../config/bd_mongo");
require("../../../models/listaAmigos");
const ListaAmigos = mongoose.model('listaAmigos');
const UserDao = require("./user-dao");

class ListaAmigosDao {


    novo(lista) {
        return new ListaAmigos(lista).save()
    }

    atualizar(parametro, update) {
        return ListaAmigos.findByIdAndUpdate(parametro, update)
    }

    async mostrarQuando(id) {
        try {
            var listaAmigosParam1 = await ListaAmigos.find({ id_user: `${id}` }).lean().exec();
            var listaAmigosParam2 = await ListaAmigos.find({ id_amigo: `${id}` }).lean().exec();

            var listaAmigos = listaAmigosParam1;

            const userDao = new UserDao();
            const userLogado = await userDao.acharPorId(id).exec();

            for (let i = 0; i < listaAmigosParam1.length; i++) {
                // listaAmigosParam1[i].id_user = userLogado;
                let userLogadoParam1 = await userDao.acharPorId(listaAmigosParam1[i].id_amigo).exec();
                listaAmigosParam1[i] = userLogadoParam1
            }
            for (let i = 0; i < listaAmigosParam2.length; i++) {
                // listaAmigosParam2[i].id_amigo = userLogado;
                let userLogadoParam2 = await userDao.acharPorId(listaAmigosParam2[i].id_user).exec();
                listaAmigosParam2[i] = userLogadoParam2
            }

            listaAmigos = listaAmigosParam1.concat(listaAmigosParam2);

            return listaAmigos;


        } catch (error) {
            return error
        }
    }
}

// const amigosDao = new ListaAmigosDao();

// const teste = amigosDao.mostrarQuando("5f2c27e96f80143d48a175cd");

// console.log(teste);

module.exports = ListaAmigosDao;


