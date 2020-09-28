const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const EquipeTeam = new Schema({
    id_player1:{
        type:String
    },
    id_player2:{
        type:String
    },
    id_player3:{
        type:String
    },
    id_player4:{
        type:String
    },
    id_player5:{
        type:String
    },
    id_Manager: {
        type: String
    },
    id_Dono: {
        type: String
    },
    id_Capitão: {
        type: String
    }
})

mongoose.model("equipeTeam", EquipeTeam);



