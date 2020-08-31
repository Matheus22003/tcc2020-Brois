const { express } = require('../../config/custom-express');
const router = express.Router();
// const rotasTour = require('./helper_routes/rotasTournament')
const axios = require('axios');

router.route('/')
    .get((req, res) => {
        res.render('loggedTournament/index')
    })


router.route('/create')
    .get((req, res) => {
        res.render('loggedTournament/formulario')
    })

module.exports = router
