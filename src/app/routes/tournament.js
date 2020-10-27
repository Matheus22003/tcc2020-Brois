const { express } = require('../../config/custom-express');
const router = express.Router();
// const rotasTour = require('./helper_routes/rotasTournament')
const axios = require('axios');

router.route('/')
    .get((req, res) => {
        res.render('play/tournaments/index');

        axios.get('br1.api.riotgames.com/lor/ranked/v1/leaderboards', {
            params: {
                api_key: "RGAPI-7b7c76e0-30f7-4cc2-8863-ca63022f28c1"

            }
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    })

module.exports = router
