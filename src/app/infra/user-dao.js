const mongoose = require("../../config/bd_mongo");
require("../../../models/users")
const User = mongoose.model('user');

class UserDao {
    acharUm(valorParaEncontrar) {
        return User.findOne(valorParaEncontrar)
    }

    acharPorId(valorDoId, podeSerNull) {
        return User.findById(valorDoId, podeSerNull);
    }
    acharPorIdRes(valorDoId, podeSerNull) {
        return User.findById(valorDoId, podeSerNull).lean().populate('carteiras')
            .then((doc) => {
                return doc
            })
            .catch(err => {
                return err
            });
    }
    achar(valorParaAchar) {
        return User.find(valorParaAchar).lean().populate('carteiras')
    }

    novo(valorDoNovoUsuario) {
        return new User(valorDoNovoUsuario).save()
    }

    atualizar(parametro, valores) {
        return User.findOneAndUpdate(parametro, valores)
    }
}

module.exports = UserDao;