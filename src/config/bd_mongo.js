const mongoose = require('mongoose');

// Mongoose
mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://admin:admin@cluster0-z85sx.gcp.mongodb.net/rivals?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log("Conectado ao BD com sucesso");

    }).catch((err) => {
        console.log("Erro ao se conectar no BD: " + err);
    })

module.exports = mongoose