var { io } = require('../../config/custom-express')
const UserDao = require('../infra/user-dao');
const userDao = new UserDao()

// userDao.acharPorId()

io.on('connection', (socket) => {

    socket.on('id', (idUser) => {
        userDao.acharUm({ rivalsId: idUser }).then((suc) => {
            if (suc == null) {
                // Nick Livre
                socket.emit('dados', true)
            } else {
                // Nick Usado
                socket.emit('dados', false)

            }
        }).catch(() => {
            //Nick Livre
            socket.emit('dados', true)
        })
    })

})




module.exports = io;