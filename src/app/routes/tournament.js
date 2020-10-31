const { express } = require('../../config/custom-express');
const router = express.Router();
// const rotasTour = require('./helper_routes/rotasTournament')
const axios = require('axios');
const TournamentDao = require(`../infra/tournament-dao`);
const EquipeDao = require(`../infra/equipe-dao`)


router.route('/')
    .get(async (req, res) => {
        var timesCertos = [];
        const equipeDao = new EquipeDao()
        var equipe = await equipeDao.getEquipe()
        equipe = JSON.stringify(equipe);
        equipe = JSON.parse(equipe);
        for (let index = 0; index < equipe.length; index++) {
            const element = equipe[index];
            if (element.id_team.id_player1 == res.locals.user._id) {
                timesCertos.push(element)
            }
            if (element.id_team.id_player2 == res.locals.user._id) {
                timesCertos.push(element)
            }
            if (element.id_team.id_player3 == res.locals.user._id) {
                timesCertos.push(element)
            }
            if (element.id_team.id_player4 == res.locals.user._id) {
                timesCertos.push(element)
            }
            if (element.id_team.id_player5 == res.locals.user._id) {
                timesCertos.push(element)
            }
        }


        var tournamentDao = new TournamentDao();
        var torneios = await tournamentDao.getTorneios();
        torneios = JSON.stringify(torneios);
        torneios = JSON.parse(torneios);
        // console.log(torneios);

        var torDisponiveis = [];
        // torneios.forEach(element => {
        //     console.log(element.iniciado);
        // });
        for (let index = 0; index < torneios.length; index++) {
            const element = torneios[index];

            if (element.iniciado == false) {
                torDisponiveis.push(element);
            }
            else {

            }
        }
        for (let index = 0; index < torDisponiveis.length; index++) {
            torDisponiveis[index].equipesUsers = timesCertos
        }



        // console.log(timesCertos);
        // console.log(torDisponiveis);

        res.render('play/tournaments/index', { torneios: torDisponiveis });
    })

router.route(`/create`)
    .get(async (req, res) => {


        res.render(`play/tournaments/createTournament`);
    })
    .put(async (req, res) => {

        var idProvedor = await axios({
            method: 'post',
            url: 'https://americas.api.riotgames.com/lol/tournament-stub/v4/providers?api_key=RGAPI-7b7c76e0-30f7-4cc2-8863-ca63022f28c1',
            headers: {},
            data: {
                "region": "BR",
                "url": "https://tcc2020-brois.herokuapp.com"
            }
        })

        var idtournament = await axios({
            method: 'post',
            url: 'https://americas.api.riotgames.com/lol/tournament-stub/v4/tournaments?api_key=RGAPI-7b7c76e0-30f7-4cc2-8863-ca63022f28c1',
            headers: {},
            data: {
                "name": "Teste",
                "providerId": idProvedor.data
            }
        })

        // var idUserCodes = await axios({
        //     method: 'post',
        //     url: `https://americas.api.riotgames.com/lol/tournament-stub/v4/codes?count=1&tournamentId=${idtournament.data}&api_key=RGAPI-7b7c76e0-30f7-4cc2-8863-ca63022f28c1`,
        //     headers: {},
        //     data: {
        //         "mapType": "SUMMONERS_RIFT",
        //         "pickType": "TOURNAMENT_DRAFT",
        //         "spectatorType": "ALL",
        //         "teamSize": 5
        //     }
        // })
        var dadosTorneio = {
            fotoTorneio: req.body.base64_torneioBanner,
            nomeTorneio: req.body.nomeTorneio,
            tipoJogo: req.body.tipoJogo,
            jogoTorneio: req.body.jogoTorneio,
            qtdeParticipantes: req.body.qtdeParticipantes,
            descricaoTorneio: req.body.descricaoTorneio,
            padraoGame: "Ranqueada",
            mapas: req.body.mapas,
            minLevel: req.body.minLevel,
            maxLevel: req.body.maxLevel,
            tipoPremio: req.body.tipoPremio,
            entrada: req.body.entrada,
            premioTotal: req.body.premioTotal,
            dataInicio: req.body.dataInicio,
            hotaInicio: req.body.hotaInicio,
            idTournament: idtournament.data,
            criadora: req.body.criadora
        }
        var tournamentDao = new TournamentDao();

        var add = await tournamentDao.novo(dadosTorneio);

        console.log(dadosTorneio)



        res.redirect(`/tournament`);
    })

module.exports = router
