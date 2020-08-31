const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
require('../../../models/users');
const User = mongoose.model('user');
mongoose.set('useFindAndModify', false);


router.get("/confirmaremail/:id", (req, res) => {
    let filter = { _id: req.params.id }
    let update = { verificar_email: true }
    User.findOneAndUpdate(filter, update).then(() => {
        User.findOne(filter).lean().then((user)=>{
            req.flash("success_msg", `Tudo certo! Seja bem vindo a Rivals Tournament, ${user.nome} "${user.exibicaoTag}" ${user.sobrenome}`);
            res.redirect('/')
        })
    }).catch((err)=>{
        req.flash('error_msg',"Falha ao confirmar, link de confirmação expirado!");
        console.log(err);
        
        res.redirect('/');
    })
})

module.exports = router;