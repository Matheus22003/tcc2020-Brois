var { io } = require('../../config/custom-express')
const TournamentDao = require('../infra/tournament-dao');
const tournamentDao = new TournamentDao();


io.on('connection', (socket) => {
    socket.on(`completarTorneio`, async res => {
        var torneio = await tournamentDao.getTorneios({ _id: res });
        torneio = JSON.stringify(torneio);
        torneio = JSON.parse(torneio);
        if (torneio[0].iniciado == true) {
        }
        else {
            tournamentDao.atualizar({ _id: torneio[0]._id }, { iniciado: true }).then(suc => {
                suc = JSON.stringify(suc);
                suc = JSON.parse(suc);
            }).catch(err => {
            })

        }
    })

})

io.close()



module.exports = io;