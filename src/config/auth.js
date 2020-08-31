const localStrategy = require("passport-local").Strategy
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Model de usuário
require("../../models/users");
const Usuario = mongoose.model('user');

module.exports = (passport) => {
    passport.use(new localStrategy({ 
        usernameField: "email", 
        passwordField: 'senha' 
    }, 
    (email, senha, done) => {
        
        var comSem = email.indexOf('@');
        
        if (comSem != -1) {
            Usuario.findOne({ email: email }).populate('carteiras').then((usuario) => {
                if (!usuario) {
                    return done(null, false, { message: "Esta conta não existe" })
                }
                else {
                    
                    bcrypt.compare(senha, usuario.senha, (erro, batem) => {
                        if (batem) {
                            return done(null, usuario)
                        } else {
                            return done(null, false, { message: "Senha incorreta" })
                        }
                    })
                }
            })
        } else {
            Usuario.findOne({ rivalsId: email }).populate('carteiras').then((usuario) => {
                if (!usuario) {
                    return done(null, false, { message: "Está conta não existe!" })
                }
                else {
                    bcrypt.compare(senha, usuario.senha, (erro, batem) => {
                        if (batem) {
                            return done(null, usuario)
                        }
                        else {
                            return done(null, false, { message: "senha incorreta" })
                        }
                    })
                }
            })
        }


    }))

    passport.serializeUser((usuario, done) => {
        done(null, usuario._id)
    })

    passport.deserializeUser((id, done) => {
        Usuario.findById(id, (err, usuario) => {
            done(err, usuario)
        }).populate('carteiras')
    })



}