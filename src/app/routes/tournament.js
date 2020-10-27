const { express } = require('../../config/custom-express');
const router = express.Router();
// const rotasTour = require('./helper_routes/rotasTournament')
const axios = require('axios');

router.route('/')
    .get((req, res) => {

        axios.post('https://americas.api.riotgames.com/lol/tournament-stub/v4/providers',
            { params: { api_key: "RGAPI-7b7c76e0-30f7-4cc2-8863-ca63022f28c1" } },
            { headers: { "region": "BR", "url": "https://tcc2020-brois.herokuapp.com/" } })
            .then(function (response) {
                res.render('play/tournaments/index');
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    })

module.exports = router
