const Enrollment = require('../models/enrollment');
const Course = require('../models/course');
const Joi = require('joi');

const enrollmentValidationSchema = Joi.object({
    courseId: Joi.string().required()
});

exports.enrollInCourse = async (req, res) => {
    const { courseId } = req.body;

    // Validate the input
    const { error } = enrollmentValidationSchema.validate({ courseId });
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ message: 'Course not found' });

        const existingEnrollment = await Enrollment.findOne({
            course: courseId,
            user: req.user._id
        });

        if (existingEnrollment) {
            return res.status(400).json({ message: 'User is already enrolled in this course' });
        }

        const enrollment = new Enrollment({
            course: courseId,
            user: req.user._id
        });

        await enrollment.save();
        res.status(201).json(enrollment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getUserEnrollments = async (req, res) => {
    try {
        const enrollments = await Enrollment.find({ user: req.user._id }).populate('course');
        res.status(200).json(enrollments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getCourseEnrollments = async (req, res) => {
    try {
        const enrollments = await Enrollment.find({ course: req.params.courseId }).populate('user', 'name email');
        res.status(200).json(enrollments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteEnrollment = async (req, res) => {
    try {
        const enrollment = await Enrollment.findOne({
            course: req.params.courseId,
            user: req.user._id
        });

        if (!enrollment) {
            return res.status(404).json({ message: 'Enrollment not found' });
        }

        await enrollment.remove();
        res.status(200).json({ message: 'User unenrolled from the course' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
