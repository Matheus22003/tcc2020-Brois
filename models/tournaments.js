const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const Tournaments = new Schema({
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
    qtdeParticipantes: {
        type: Number,
        required: true
    },
    descricaoTorneio: {
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
    }
});
mongoose.model("tournaments", Tournaments);