const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    course_id: {
        type: String,
        required: true,
        unique: true
    },
    course_name: {
        type: String,
        required: true
    },
    enrolled_Students: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student'
        }]
    },
    professor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    },
    semester: {
        type: String,
        required: true
    },
    credit: {
        type: Number,
    }
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);