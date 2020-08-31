const mongoose = require("../../config/bd_mongo");
require("../../../models/carteiras")
const Carteiras = mongoose.model('carteiras');

class CarteiraDao {

    novo(valorDaNovaCarteira) {
        return new Carteiras(valorDaNovaCarteira).save()
    }

    atualizar(parametro, update) {
        return Carteiras.findOneAndUpdate(parametro, update)
    }
}

module.exports = CarteiraDao;

// const User = require("./user-dao");
// const userDao = new User();
// const carteiraDao = new CarteiraDao();

// const userTeste = {
//     nome: "Teste",
//     sobrenome: "Simões",
//     rivalsId: "tantofaz",
//     exibicaoTag: "TantoFaz",
//     email: "pingoben10gamer@gmail.com",
//     senha: "12345",
//     data_nascimento: "22/03/2003",
//     celular: '11987704670',
//     jogarLol: true,
//     jogarCSGO: true,
//     jogarValorant: true
// }

// carteiraDao.novo().then((sucesso) => {
//     userTeste['id_carteira'] = sucesso._id
//     userDao.novo(userTeste).then(() => {
//         console.log("Usuario criado com sucesso");
        
//     }).catch()        
// }).catch()

// userDao.acharUm({ email: "pingoben10gamer@gmail.com" }).lean().populate("carteiras").then(sucesso => {
//     console.log(sucesso.id_carteira.carteiras);
    
// })
