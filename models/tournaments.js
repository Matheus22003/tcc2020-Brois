const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const Tournaments = new Schema({
    iniciado:{
        type: mongoose.Schema.Types.Boolean
    },
    fotoTorneio: {
        type: String
    },
    bannerTorneio: {
        type: String
    },
    nomeTorneio: {
        type: String,
        required: true
    },
    tipoJogo: {
        type: String
    },
    jogoTorneio: {
        type: String,
        required: true
    },
    qtdeParticipantes: {
        type: Number,
        required: true
    },
    descricaoTorneio: {
        type: String
    },
    padraoGame: {
        type: String
    },
    mapas: {
        type: String
    },
    minLevel: {
        type: Number
    },
    maxLevel: {
        type: Number
    },
    tipoPremio: {
        type: String
    },
    entrada: {
        type: String
    },
    premioTotal: {
        type: Number
    },
    dataInicio: {
        type: String
    },
    hotaInicio: {
        type: String
    },
    idTournament: {
        type: String
    },
    criadora: {
        type: String
    }
});
mongoose.model("tournaments", Tournaments);