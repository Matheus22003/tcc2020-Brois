const mongoose = require("mongoose")
const Schema = mongoose.Schema;
require('mongoose-type-email');

const Carteiras = new Schema({
    reais:{
        type: Schema.Types.Decimal128,
        required: true,
        default: 0.00

    }
})


mongoose.model('carteiras',Carteiras)