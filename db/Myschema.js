const mongoose = require("mongoose");
// var autoIncrement = require('mongoose-auto-increment'); 

const myschem = new mongoose.Schema({ 
    title: {type : String}, 
    is_completed: {type : String},
    id: {type : Number},
})

// counter schema

const counterSchema ={
    id:{
        type:String
    },
    seq:{
        type:Number
    }
}

const counterModel = mongoose.model("counter" , counterSchema)

const myModel = mongoose.model("myModel" , myschem )

module.exports = {myModel , counterModel }

