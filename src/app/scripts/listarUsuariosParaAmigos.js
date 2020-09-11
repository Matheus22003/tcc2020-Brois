var { io } = require('../../config/custom-express')
const UserDao = require('../infra/user-dao');
const userDao = new UserDao()

// userDao.acharPorId()

io.on('connection', (socket) => {
    userDao.achar({}).then((suc) => {
        socket.emit("listaUsers", suc)
    }).catch()
})

io.close()

module.exports = io;