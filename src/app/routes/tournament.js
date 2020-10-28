const { express } = require('../../config/custom-express');
const router = express.Router();
// const rotasTour = require('./helper_routes/rotasTournament')
const axios = require('axios');
router.route('/')
    .get(async (req, res) => {
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

        var idUserCodes = await axios({
            method: 'post',
            url: `https://americas.api.riotgames.com/lol/tournament-stub/v4/codes?count=1&tournamentId=${idtournament.data}&api_key=RGAPI-7b7c76e0-30f7-4cc2-8863-ca63022f28c1`,
            headers: {},
            data: {
                "mapType": "SUMMONERS_RIFT",
                "pickType": "TOURNAMENT_DRAFT",
                "spectatorType": "ALL",
                "teamSize": 5
            }
        })

        console.log(idUserCodes.data);
        res.render('play/tournaments/index');

    })

router.route(`/create`)
    .get((req, res) => {
        res.render(`play/tournaments/createTournament`);
    })
    .put((req, res) => {
        
    })

module.exports = router
