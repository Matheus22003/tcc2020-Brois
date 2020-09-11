var { io } = require('../../config/custom-express')
const UserDao = require('../infra/user-dao');
const userDao = new UserDao();
const ListaAmigos = require('../infra/listaAmigos-dao')
const listaAmigos = new ListaAmigos()

io.on('connection', (socket) => {
    socket.on("addAmigoAtivado", (ativador) => {
        if (ativador == true) {
            socket.on("addAmigo", (res) => {
                let id = res.rivalsId
                let idAmigo = res.rivalsIdRivalsAmgio
                userDao.acharUm({ rivalsId: id }).then((user) => {

                    userDao.acharUm({ rivalsId: idAmigo }).then(amigo => {

                        listaAmigos.novo({
                            id_user: user._id,
                            id_amigo: amigo._id,
                            is_confirmed: false,
                            is_blocked: false,
                            is_favorite: false
                        })

                    }).catch(err => {

                    })

                }).catch(err => {

                })
            })
        } else {

        }
    })
})
io.close()



module.exports = io;