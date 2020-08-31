var {io} = require('../../config/custom-express');
const UserDao = require('../infra/user-dao');
const userDao = new UserDao()

class SocketDao{

    enviarDados(dados){
        io.on('connection',(socket) =>{
            socket.emit('dados',dados)
        })
    }

    receberDados() {       
        io.on('connection',socket =>{
            socket.on('id',(idUser) =>{
                // return console.log(idUser)
                
                userDao.acharUm({rivalsId :idUser}).then((suc) => {
                    if (suc == null) {
                        //Nick Livre
                        return 'false'
                    } else {
                        // Nick Usado
                        return 'true'

                    }
                }).catch(() => {
                    //Nick Livre
                    return 'false'
                })
            })

        }) 

    }
}

module.exports = SocketDao