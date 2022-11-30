const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/Placment' , {
}).then(()=>{
    console.log("Database is succesfull connected")
}).catch((err)=>{
    console.log(err)
})