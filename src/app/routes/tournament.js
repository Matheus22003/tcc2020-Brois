const { express } = require('../../config/custom-express');
const router = express.Router();
// const rotasTour = require('./helper_routes/rotasTournament')
const axios = require('axios');
const request = require('request')
// ,
//             { headers: { "region": "BR", "url": "https://tcc2020-brois.herokuapp.com" } }
router.route('/')
    .get(async (req, res) => {

        // request.post(`https://americas.api.riotgames.com/lol/tournament-stub/v4/providers?api_key=RGAPI-7b7c76e0-30f7-4cc2-8863-ca63022f28c1`).setHeader
        // var options = {
        //     url: `https://americas.api.riotgames.com/lol/tournament-stub/v4/providers?api_key=RGAPI-7b7c76e0-30f7-4cc2-8863-ca63022f28c1`,
        //     headers: {
        //         region: "BR",
        //         url: "https://tcc2020-brois.herokuapp.com"
        //     },
        //     method: "POST"
        // }

        // function callback(error, response, body) {
        //     if (!error && response.statusCode == 200) {
        //         console.log(body);
        //         console.log(response);
        //     }
        //     else {
        //         console.log(`Erro: ${error}`);
        //     }
        // }
        // request(options, callback);
        // axios.post('https://americas.api.riotgames.com/lol/tournament-stub/v4/providers?api_key=RGAPI-7b7c76e0-30f7-4cc2-8863-ca63022f28c1',
        //     {
        //         body: {
        //             params: {
        //                 "region": "BR",
        //                 "url": "https://tcc2020-brois.herokuapp.com"
        //             }
        //         }
        //     })
        //     .then(function (response) {
        //         console.log(response)
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     })
        //     .then(function () {
        //         // always executed
        //     });

        var idProvedor = await axios({
            method: 'post',
            url: 'https://americas.api.riotgames.com/lol/tournament-stub/v4/providers?api_key=RGAPI-7b7c76e0-30f7-4cc2-8863-ca63022f28c1',
            headers: {},
            data: {
                "region": "BR",
                "url": "https://tcc2020-brois.herokuapp.com"
            }
        })

        idProvedor.data

        res.render('play/tournaments/index');

    })

module.exports = router
