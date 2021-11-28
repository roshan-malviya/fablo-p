const mongoose = require("mongoose")


const StudentSchema = new mongoose.Schema({

    name : {
        type : String,
        required : true
    },
    phone : {
        type : Number,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    bloodGroup : {
        type : String,
        required : true
    },gender : {
        type : String,
        required : true
    }
})

module.exports = Student = mongoose.model('student',StudentSchema)

