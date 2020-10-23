const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const HistoricoEquipe = new Schema({
    id_torneio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tournaments'
    },
    id_equipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'equipe'
    },
    posicao: {
        type: String
    }
});
mongoose.model("historicoEquipes", HistoricoEquipe);