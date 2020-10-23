var { io } = require('../../config/custom-express')
const UserDao = require('../infra/user-dao');
const userDao = new UserDao();
const ListaAmigos = require('../infra/listaAmigos-dao')
const listaAmigos = new ListaAmigos()

io.on('connection', (socket) => {
    socket.on("addAmigoAtivado", (ativador) => {
        if (ativador == true) {
            socket.on("addAmigo", (res) => {
                let id = `${res.rivalsId}`;
                let juntar=[];

                for (let index = 0; index < 24; index++) {
                    const element = id[index];
                    // juntar.concat(element)
                    // console.log(element);
                    juntar[index] = element
                }
                juntar = juntar.toString().replace(/\,/g,'')
                id = juntar
                console.log(id);
                let idAmigo = res.rivalsIdRivalsAmgio
                userDao.acharPorId(id).then((user) => {
                    userDao.acharUm({ rivalsId: idAmigo }).then(amigo => {

                        listaAmigos.novo({
                            id_user: user._id,
                            id_amigo: amigo._id,
                            is_confirmed: false,
                            is_blocked: false,
                            is_favorite: false
                        })

                    }).catch(err => {
                        console.log(err);
                    })

                }).catch(err => {
                    console.log(err);
                })
            })
        } else {

        }
    })
})
io.close()



module.exports = io;