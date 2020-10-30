const mongoose = require("../../config/bd_mongo");
require("../../../models/tournaments");
const Tournament = mongoose.model('tournaments');
require("../../../models/historicoEquipes");
const HistoricoEquipes = mongoose.model('historicoEquipes');

class TournamentDao {



    novo(dadosTorneio) {
        return new Tournament(dadosTorneio).save()
            .then(suc => {
                return true
            }).catch(err => {
                return false
            })
    }

    async getTorneios(filtro) {
        try {
            const torneios = await Tournament.find(filtro).exec();
            
            return torneios

        } catch (error) {
            return error
        }
    }

    atualizar(parametro, update) {
        return Tournament.findOneAndUpdate(parametro, update).then(suc => {
            suc = JSON.stringify(suc);
            suc = JSON.parse(suc);
            return suc
        }).catch(err => {
            console.log(err);
            return err
        })
    }

    addPlayerToTournament(idTorneio, idEquipe, id_torneioUser) {

        HistoricoEquipes.find({ id_torneio: idTorneio })
            .then(suc => {
                var numMaior = 0

                for (let i = 0; i < suc.length; i++) {
                    const element = suc[i];
                    if (element.posicao > numMaior) {
                        numMaior = element.posicao + 1
                    }
                    else if (element.posicao == numMaior) {
                        numMaior = element.posicao + 1
                    }
                }

                new HistoricoEquipes({ id_torneio: idTorneio, id_equipe: idEquipe, posicao: numMaior, id_torneioUser: id_torneioUser }).save().then(suc => {
                    suc = JSON.stringify(suc);
                    suc = JSON.parse(suc);
                    return suc;
                }).catch(err => {
                    return false
                })


            })

            .catch(err => {
                return err
            })


    }
}


module.exports = TournamentDao;