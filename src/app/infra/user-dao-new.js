const mongoose = require("../../config/bd_mongo");
require("../../../models/users")
require('../../../models/carteiras')
const User = mongoose.model('user');
const Carteiras = require('./carteira-dao');

class UserDao {
    async acharUm(valorParaEncontrar) {
        try {
            var user = await User.findOne(valorParaEncontrar).lean().populate('carteiras')
                .exec();
            user = JSON.stringify(user);
            user = JSON.parse(user);
            return user

        } catch (error) {
            return error
        }
    }
    // findById(valorDoId, podeSerNull)
    async acharPorId(valorDoId, podeSerNull) {
        try {
            var user = await User.findById(valorDoId, podeSerNull).lean().populate('carteiras')
                .exec();
            return user

        } catch (error) {
            return error
        }
    }

    async achar(valorParaAchar) {
        try {
            var user = await User.find(valorParaAchar).lean().populate('carteiras')
                .exec();
            user = JSON.stringify(user);
            user = JSON.parse(user);
            return user

        } catch (error) {
            return error
        }
    }

    novo(valorDoNovoUsuario) {
        try {
            const carteirasDao = new Carteiras();
            carteirasDao.novo({ reais: 0 }).then(suc => {
                new User(valorDoNovoUsuario).save().then(suc => {
                    return true
                }).catch(err => { return err });
            }).catch(err => { return err })
        } catch (error) {
            return false;
        }
    }

    atualizar(parametro, valores) {
        return User.findOneAndUpdate(parametro, valores)
    }
}

// const test = new UserDao();

// var tes = test.acharUm({ _id: "5f4d2160557154119c7baf18" })
// console.log();
module.exports = UserDao;