// controllers/reviewController.js

const Review = require('../models/review');
const Course = require('../models/course');
const Joi = require('joi');
const reviewValidationSchema = require('../validation/reviewValidation')


// Create a new review
exports.createReview = async (req, res) => {
    const { courseId, rating, comment } = req.body;

    // Validate request data
    const { error } = reviewValidationSchema.validate({ courseId, rating, comment });
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ message: 'Course not found' });

        const review = new Review({
            course: courseId,
            user: req.user._id, // Assuming the user is authenticated
            rating,
            comment
        });

        await review.save();
        res.status(201).json(review);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all reviews for a course
exports.getReviewsForCourse = async (req, res) => {
    try {
        const reviews = await Review.find({ course: req.params.courseId }).populate('user', 'name');
        res.status(200).json(reviews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a review
exports.updateReview = async (req, res) => {
    const { rating, comment } = req.body;

    // Validate request data
    const { error } = reviewValidationSchema.validate({ courseId: req.params.courseId, rating, comment });
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const review = await Review.findById(req.params.id);
        if (!review) return res.status(404).json({ message: 'Review not found' });

        // Only allow the user who created the review to update it
        if (review.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to update this review' });
        }

        review.rating = rating;
        review.comment = comment;
        await review.save();
        res.status(200).json(review);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete a review
exports.deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) return res.status(404).json({ message: 'Review not found' });

        // Only allow the user who created the review to delete it
        if (review.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to delete this review' });
        }

        await review.remove();
        res.status(200).json({ message: 'Review deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
