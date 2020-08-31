const mongoose = require("mongoose")
const Schema = mongoose.Schema;
require('mongoose-type-email');

const ListaAmigos = new Schema({
    id_user:{
        type: mongoose.Schema.Types.ObjectId,
        // ref: "user",
        required: true
    },
    id_amigo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    is_confirmed: {
        type: Boolean,
        required: false  
    },
    is_blocked: {
        type: Boolean,
        default: false
    },
    is_favorite: {
        type: Boolean,
        default: false
    }
})


mongoose.model('listaAmigos', ListaAmigos)