const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const Equipe = new Schema({
    foto_time: {
        type: String
    },
    banner_time: {
        type: String
    },
    nomeTeam: {
        type: String,
        required: true
    },
    descricaoTeam: {
        type: String
    },
    tagTeam: {
        type: String,
        required: true
    },
    id_team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "equipeTeam"
    },
    countryTeam: {
        type: String,
        required: true
    }

});
mongoose.model("equipe", Equipe);