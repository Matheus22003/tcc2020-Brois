const mongoose = require("../../config/bd_mongo");
require("../../../models/tournaments");
// require('../../../models/equipe_team');
// const Equipe = mongoose.model('equipe');
const EquipeTeam = mongoose.model('tournaments')

class EquipeDao {
    novo(integrantesTime, InfosEquipe) {
        return new EquipeTeam(integrantesTime).save().then(suc => {
            InfosEquipe.id_team = suc._id;
            new Equipe(InfosEquipe).save().then(suc => {
                return true;
            }).catch(err => { return console.log(err); });
        }).catch(err => { return console.log(err); });


    }

    async getEquipesFull() {
        try {
            const equipesInfos = await Equipe.find().populate('equipeTeam').exec();
            const timeEquipe = await EquipeTeam.find().exec();
            var time = equipesInfos;
            for (let i = 0; i < equipesInfos.length; i++) {
                const element = equipesInfos[i];
                for (let index = 0; index < timeEquipe.length; index++) {
                    if (`${timeEquipe[index]._id}` == `${element.id_team}`) {
                        time[i].id_team = timeEquipe[index];
                    }
                    else {
                    }

                }
            }
            return time;
        }
        catch (err) {
            return err;
        }
    }

    async getEquipe(filtro) {
        try {
            const equipesInfos = await Equipe.find(filtro).populate('equipeTeam').exec();
            var equipe = equipesInfos;
            const timeEquipe = await EquipeTeam.find().exec();

            for (let index = 0; index < equipesInfos.length; index++) {
                const element = equipesInfos[index];

                for (let i = 0; i < timeEquipe.length; i++) {
                    // const element = timeEquipe[i];
                    if (`${timeEquipe[index]._id}` == `${element.id_team}`) {
                        equipe[i].id_team = timeEquipe[index];
                    }
                    else {
                        console.log("erro");
                    }

                }

            }
            return equipe
        } catch (error) {
        }
    }

    atualizar(parametro, update) {
        return Equipe.findOneAndUpdate(parametro, update).then(suc => {
            console.log(suc);
            return suc
        }).catch(err => {
            console.log(err);
            return err
        })
    }
}