const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    
    campusId:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    standard:{
        type:String,
        required:true
    },
    totalMark:{
        type:Number,
        required:true
    }
})

module.exports =mongoose.model("student",studentSchema)