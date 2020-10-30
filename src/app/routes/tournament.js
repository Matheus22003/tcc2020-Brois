const { express } = require('../../config/custom-express');
const router = express.Router();
// const rotasTour = require('./helper_routes/rotasTournament')
const axios = require('axios');
const TournamentDao = require(`../infra/tournament-dao`);


router.route('/')
    .get(async (req, res) => {
        var tournamentDao = new TournamentDao();
        var torneios = await tournamentDao.getTorneios();
        torneios = JSON.stringify(torneios);
        torneios = JSON.parse(torneios);
        // console.log(torneios);
        for (let i = 0; i < torneios.length; i++) {
            const element = torneios[i];
            if (element.iniciado == true) {
               torneios = torneios.indexOf(i)
            }
            
        }
        res.render('play/tournaments/index', { torneios: torneios });
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
