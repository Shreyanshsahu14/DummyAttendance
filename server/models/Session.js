const mongoose = require("mongoose")

const SessionSchema = new mongoose.Schema({
    from_year:{
        type: Number,
        required: true
    },
    to_year:{
        type: Number,
        required: true
    },
    from_month:{
        type: String,
        required: true
    },
    to_month:{
        type: String,
        required: true
    },
    enrolled_branch: {
        type: String,
        required: true
    },
    current_batch: {
        type: Number,
        required: true
    }
} , {timestamps: true});

module.exports = mongoose.model("Session",SessionSchema)