const ListaAmigosDao = require('./listaAmigos-dao');
const UserDao = require('./user-dao');
const userDao = new UserDao();
const listaAmigosDao = new ListaAmigosDao();
var amigos = [];
var nomeAmigos = [];


function listaAmigos(userId) {

    while (nomeAmigos.length) {
        nomeAmigos.pop();
    }
    
    listaAmigosDao.mostrarQuando({ id_user: `${userId}` }).lean()
        .then((doc) => {

            listaAmigosDao.mostrarQuando({ id_amigo: `${userId}` }).lean()
                .then(docs => {

                    doc = doc.concat(docs);


                    for (let index = 0; index < doc.length; index++) {
                        const element = doc[index];
                        amigos[index] = element;
                        userDao.acharPorId(`${element.id_user}`).lean().then(succ => {
                            amigos[index].id_user = succ;
                            // console.log(amigos);

                            userDao.acharPorId(`${element.id_amigo}`).lean().then(succs => {
                                amigos[index].id_amigo = succs;
                                // console.log(amigos[index]);
                                if (index == doc.length - 1) {


                                    for (let i = 0; i < amigos.length; i++) {
                                        const element = amigos[i];
                                        if (`${element.id_amigo._id}` == userId) {
                                            nomeAmigos.push({
                                                'id_amigo': element.id_user._id,
                                                'nome': element.id_user.nome
                                            })
                                        }
                                        else if (`${element.id_user._id}` == userId) {
                                            nomeAmigos.push({
                                                'id_amigo': element.id_amigo._id,
                                                'nome': element.id_amigo.nome
                                            })
                                        }


                                    }
                                    // console.log(nomeAmigos);

                                    return nomeAmigos;




                                }
                            }).catch(err => { return console.log(err); })
                        }).catch(err => { return console.log(err); })
                    }
                })
                .catch()
        }).catch();
}

module.exports = {
    amigosAtivador: listaAmigos,
    listaAmigos: nomeAmigos
}