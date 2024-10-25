const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    enrollmentNum:{
        type: String,
        required: true,
        unique: true
    },
    rollNum:{
        type: String,
        required: true
    },
    enrolledBranch: {
        type: String,
        required: true
    },
    enrolledYear: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Student",StudentSchema);