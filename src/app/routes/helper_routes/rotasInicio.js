const veriIdade = require('../../scripts/verificarIdade');// Verificação de idade
const enviar_email = require('../../scripts/email.js'); // Enviar E-Mail
const copiarArquivo = require('../../scripts/copiarArquivo');// Copiar Arquivo
const UserDao = require('../../infra/user-dao')
const CarteiraDao = require('../../infra/carteira-dao')
const ListaAmigosDao = require('../../infra/listaAmigos-dao');
const retornaJson = require('../../infra/retornaJson')
const bcrypt = require('bcryptjs');
const { path, passport, io } = require('../../../config/custom-express');




const rotaGet = (req, res) => {
    if (res.locals.user) {
        let listAmig = {};
        const user = res.locals.user
        const userId = user._id
        retornaJson.amigosAtivador(userId);
        listaAmigos.novo({
            id_user: "5f2c27e96f80143d48a175cd",
            id_amigo: "5f35624c9669174a68e691fd",
            is_confirmed: false,
            is_blocked: false,
            is_favorite: false
        })
        setTimeout(() => {
            listAmig = retornaJson.listaAmigos
            res.render("user_general/index", { listaAmigos: listAmig })
            listAmig = {};
        }, 300)
    }
    else {
        res.render("user_general/index");
    }
}


const rotaCadastro = (req, res) => {
    /*Inicio Pegar os Valores do Usuario*/
    var jogarLol;
    var jogarCSGO;
    var jogarValorant;
    // reg_valorant
    if (req.body.reg_lol == "on") { jogarLol = true; } else { jogarLol = false }
    if (req.body.reg_csgo == "on") { jogarCSGO = true } else { jogarCSGO = false }
    if (req.body.reg_valorant == "on") { jogarValorant = true } else { jogarValorant = false }
    const novoUser = {
        nome: req.body.reg_name,
        sobrenome: req.body.reg_sobrenome,
        rivalsId: req.body.reg_rivalsId,
        exibicaoTag: req.body.reg_exibicaoTag,
        email: req.body.reg_email,
        senha: req.body.reg_senha,
        data_nascimento: req.body.reg_dataNasci,
        celular: req.body.reg_celular,
        jogarLol: jogarLol,
        jogarCSGO: jogarCSGO,
        jogarValorant: jogarValorant
    }
    const segundaSenha = {
        senhaConfirma: req.body.reg_senhaConfirma
    }
    /*Fim Pegar os Valores do Usuario*/

    /*Inicio Verificaçao dos dados usuario*/
    let erros = [];
    var idadeUser = veriIdade.calculaIdade(novoUser.data_nascimento)
    if (idadeUser < 16) {
        erros.push({ texto: 'Você deve ter pelo menos 12 anos de idade' });
    }
    var anoNasci = novoUser.data_nascimento.split('-');
    var dataAtual = new Date();
    var anoAtual = dataAtual.getFullYear();
    if (anoNasci[0] > anoAtual) {
        erros.push({ texto: "Você deve colocar um ano de nascimento valido" })
    }
    if (novoUser.senha !== segundaSenha.senhaConfirma) {
        erros.push({ texto: "As duas senhas devem coincidir!" })
    }

    if (erros.length > 0) {
        res.render('user_general/index', { erros: erros, manterDadosUser: novoUser });
        // res.redirect('/registeruser')
    }
    /*Fim Verificaçao dos dados usuario*/
    else {

        /*Inicio Começar a adicionar o usuario no BD*/
        var userDao = new UserDao();
        var carteiraDao = new CarteiraDao();
        var listaAmigosDao = new ListaAmigosDao();

        userDao.acharUm({ email: novoUser.email }).then((usuario) => { //Verificar E-mail valido (true-false)
            if (usuario) {
                erros.push({ texto: `O email ${novoUser.email} já está cadastrado em nosso sistema` });
                res.render('user_general/index', { erros: erros, manterDadosUser: novoUser });
            }
            else {
                var rivalsId_lowe = novoUser.rivalsId;
                userDao.acharUm({ rivalsId: rivalsId_lowe }).then((usuario) => { //Verifica gamer Tag valida (True-False)
                    if (usuario) {
                        erros.push({ texto: `A Gamertag '${novoUser.rivalsId}' já está cadastrado em nosso sistema` });
                        res.render('user_general/index', { erros: erros, manterDadosUser: novoUser });
                    }
                    else {
                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(novoUser.senha, salt, (err, hash) => {
                                if (err) {
                                    req.flash('error_msg', "Houve um erro durante o salvamento do usuario");
                                    res.redirect('/');
                                } else {
                                    novoUser.senha = hash;
                                    carteiraDao.novo().then(carteira => { // Cria a carteira para o usuario
                                        novoUser["carteiras"] = carteira//Adiciona a carteira ao array do novoUser
                                        userDao.novo(novoUser).then(() => {//Finalmente cria o usuario
                                            userDao.acharUm(novoUser).lean().then((usuario) => {
                                                // enviar_email.enviarEmail(novoUser.nome,novoUser.email,'pt-br',usuario._id);
                                                console.log(usuario);

                                                req.flash("success_msg", `Falta pouco ${novoUser.nome}, confirme seu email para prosseguir em sua jornada rumo ao competitivo.`);
                                                enviar_email.enviarEmail(novoUser.nome, novoUser.email, 'pt-br', usuario._id);
                                                let enderecoOriginal = path.join(__dirname, "../../../../public/user_pictures_padrao/perfil_.png");
                                                let enderecoFinal = path.join(__dirname, `../../../../public/user_pictures/perfil_${usuario._id}${usuario._id}.png`)
                                                copiarArquivo(enderecoOriginal, enderecoFinal, (erro) => {
                                                    console.log(erro);
                                                })
                                                res.redirect('/');
                                            }).catch((err) => {
                                                req.flash("error_msg", "Houve um erro para criar sua conta, entre em contato: " + err);
                                                res.redirect('/');
                                            })
                                        }).catch((err) => {
                                            req.flash("error_msg", "Houve um erro para criar sua conta: " + err);
                                            res.redirect("/")
                                        })
                                    })





                                }
                            })
                        })
                    }
                })

            }
        })
        /*Fim Começar a adicionar o usuario no BD*/
    }
}

const rotaLogin = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: "/",
        failureRedirect: "/",
        failureFlash: true
    })(req, res, next)
}

module.exports = {
    rotaGet,
    rotaCadastro,
    rotaLogin
}