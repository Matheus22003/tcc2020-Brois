const { express } = require('../../config/custom-express');
const router = express.Router();
const axios = require('axios');
const ListaAmigosDao = require('../infra/listaAmigos-dao');

//Escolher Jogo
router.route('/')
    .get((req, res) => {
        res.render('play/teams/index')
    })


router.route('/integrantes/:game')
    .get((req, res) => {
        const jogo = req.params.game;
        const listaAmigosDao = new ListaAmigosDao();
        const listaAmi = listaAmigosDao.mostrarQuando({id_user : req.user._id});
        console.log(listaAmi);


        if (jogo == "lol") {
            res.render('loggedEquipe/formularioLol',{amigos:listaAmi})

        } else if (jogo == 'valorant') {
            res.render('loggedEquipe/formularioValorant')
        } else if (jogo == 'csgo') {
            res.render('loggedEquipe/formularioCsgo')
        } else {
            res.redirect('/erro')
        }

    })

module.exports = router