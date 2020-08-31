const mongoose = require("mongoose")
const Schema = mongoose.Schema;
require('mongoose-type-email');

const User = new Schema({
    nome: {
        type: String,
        required: true
    },
    sobrenome: {
        type: String,
        required: true
    },
    data_nascimento: {
        type: String,
        required: true
    },
    rivalsId: {
        type: String,
        required: true
    },
    exibicaoTag: {
        type: String,
        required: true
    },
    email: {
        type: mongoose.SchemaTypes.Email,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    celular: {
        type: String,
        required: true
    },
    genero: {
        type: String
    },
    verificar_email: {
        type: Boolean,
        required: true,
        default: false
    },
    jogarLol: {
        type: Boolean,
        required: true,
        default: false
    },
    jogarCSGO: {
        type: Boolean,
        required: true,
        default: false
    },
    jogarValorant: {
        type: Boolean,
        required: true,
        default: false
    },
    carteiras: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "carteiras",
        required: true
    }
    // ,
    // id_time_lol_fk: {
    //     type: Schema.Types.ObjectId,
    //     ref: ""
    // }
    // ,
    // id_posicao_lol_fk: {
    //     type: Schema.Types.ObjectId,
    //     ref: ""
    // },
    // id_time_cs_fk: {
    //     type: Schema.Types.ObjectId,
    //     ref: ""
    // },
    // id_posicao_cs_fk: {
    //     type: Schema.Types.ObjectId,
    //     ref: ""
    // }
});
mongoose.model("user", User)