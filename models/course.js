// models/Course.js

const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    aboutCourse: {
        type: String,
        required: true,
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        default: 0,
    },
    languages: {
        type: [String],
        required: true,
    },
    level: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        required: true,
    },
    skillsToGain: {
        type: [String],
        required: true,
    },
    syllabus: {
        type: Object,
        required: true,
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
    }],
}, {
    timestamps: true,
});

module.exports = mongoose.model('Course', CourseSchema);
