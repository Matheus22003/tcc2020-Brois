const { express } = require('../../config/custom-express');
const router = express.Router();
const axios = require('axios');
const ListaAmigosDao = require('../infra/listaAmigos-dao');
const TimeDao = require('../infra/equipe-dao');
const UserDaoNovo = require('../infra/user-dao-new')

//Escolher Jogo
router.route('/')
    .get(async (req, res) => {
        // const userDao = new UserDaoNovo();
        // var user = await userDao.achar();
        // console.log(user[0].carteiras.reais.$numberDecimal); {{#each teste}} {{carteiras.reais.$numberDecimal}} {{else}}{{/each}}
        const timeDao = new TimeDao();
        var equipe = await timeDao.getEquipesFull();
        equipe = JSON.stringify(equipe);
        equipe = JSON.parse(equipe);
        for (let index = 0; index < equipe.length; index++) {
            const element = equipe[index];
            if (element.id_team.id_player1 == res.locals.user._id ||
                element.id_team.id_player2 == res.locals.user._id ||
                element.id_team.id_player3 == res.locals.user._id ||
                element.id_team.id_player4 == res.locals.user._id ||
                element.id_team.id_player4 == res.locals.user._id) {

            }
            else {
                equipe.splice(index, 1);
            }

        }
        res.render('play/teams/index', { equipe })
    })

router.route('/create')
    .get(async (req, res) => {
        const amigos = new ListaAmigosDao();
        var listaAmigos = await amigos.mostrarQuando(res.locals.user._id)
        listaAmigos = JSON.stringify(listaAmigos);
        listaAmigos = JSON.parse(listaAmigos);
        res.render('play/teams/createTeam', { listaAmigos });
    })

    .put(async (req, res) => {
        var timeInfo = {
            banner_time: req.body.base64input,
            foto_time: req.body.iconeTimebase64input,
            nomeTeam: req.body.nomeTime,
            tagTeam: req.body.tagTime,
            countryTeam: req.body.countryTeam,
            descricaoTeam: req.body.descricaoTeam
        }
        var timeIntegrantes = {
            id_player1: res.locals.user._id,
            id_player2: req.body.player2,
            id_player3: req.body.player3,
            id_player4: req.body.player4,
            id_player5: req.body.player5,
            id_Manager: req.body.player1,
            id_Dono: req.body.player1,
            id_Capitao: req.body.player1
        }
        const timeDao = new TimeDao();
        const userDao = new UserDaoNovo();
        for (let index = 0; index < 5; index++) {
            if (index == 1) {
                try {
                    var user = await userDao.acharUm({ "rivalsId": timeIntegrantes.id_player2 });
                    timeIntegrantes.id_player2 = user._id;
                } catch (error) {

                }

            }
            else if (index == 2) {
                try {
                    var user = await userDao.acharUm({ "rivalsId": timeIntegrantes.id_player3 });
                    timeIntegrantes.id_player3 = user._id;
                } catch (error) {

                }
            }
            else if (index == 3) {
                try {
                    var user = await userDao.acharUm({ "rivalsId": timeIntegrantes.id_player4 });
                    timeIntegrantes.id_player4 = user._id;
                } catch (error) {

                }

            }
            else if (index == 4) {

                try {
                    var user = await userDao.acharUm({ "rivalsId": timeIntegrantes.id_player5 });
                    timeIntegrantes.id_player5 = user._id;
                } catch (error) {

                }

            }

        }
        timeDao.novo(timeIntegrantes, timeInfo)
        // console.log(timeInfo);

        req.flash("success_msg", `Parabens!!! Time Criado criado com sucesso ${res.locals.user.rivalsId}!`);
        res.redirect('/teams');
    })


router.route('/integrantes/:game')
    .get((req, res) => {
        const jogo = req.params.game;
        const listaAmigosDao = new ListaAmigosDao();
        const listaAmi = listaAmigosDao.mostrarQuando({ id_user: req.user._id });
        console.log(listaAmi);


        if (jogo == "lol") {
            res.render('loggedEquipe/formularioLol', { amigos: listaAmi })

        } else if (jogo == 'valorant') {
            res.render('loggedEquipe/formularioValorant')
        } else if (jogo == 'csgo') {
            res.render('loggedEquipe/formularioCsgo')
        } else {
            res.redirect('/erro')
        }

    })

module.exports = router