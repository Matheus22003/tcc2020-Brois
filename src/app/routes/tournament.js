const { express } = require('../../config/custom-express');
const router = express.Router();
// const rotasTour = require('./helper_routes/rotasTournament')
const axios = require('axios');

router.route('/')
    .get((req, res) => {

        axios.post('https://americas.api.riotgames.com/lol/tournament-stub/v4/providers',
            { params: { api_key: "RGAPI-a28cdd7c-6884-42a4-acb1-7fcfd1c6a3e6" } },
            { headers: { "region": "BR", "url": "https://localhost:8080" } })
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
