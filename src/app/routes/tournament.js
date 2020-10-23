const { express } = require('../../config/custom-express');
const router = express.Router();
// const rotasTour = require('./helper_routes/rotasTournament')
const axios = require('axios');

router.route('/')
    .get((req, res) => {
        res.render('play/tournaments/index');
    })

module.exports = router
