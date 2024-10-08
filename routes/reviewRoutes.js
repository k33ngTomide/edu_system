// routes/reviewRoutes.js

const express = require('express');
const router = express.Router();
const reviewController = require('../controller/reviewController');
const protect = require('../middleware/authMiddleware');

/**
 * @swagger
 * /reviews/{courseId}:
 *   post:
 *     summary: Create a new review for a course
 *     tags:
 *       - Reviews
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the course to review.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 4
 *               comment:
 *                 type: string
 *                 example: "Great course!"
 *     responses:
 *       201:
 *         description: Review created successfully
 *       400:
 *         description: Invalid request or validation error
 *       404:
 *         description: Course not found
 */
router.post('/:courseId', protect, reviewController.createReview);

/**
 * @swagger
 * /reviews/{courseId}:
 *   get:
 *     summary: Get all reviews for a course
 *     tags:
 *       - Reviews
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the course whose reviews are being fetched.
 *     responses:
 *       200:
 *         description: Successfully fetched reviews
 *       404:
 *         description: Course not found
 */
router.get('/:courseId', reviewController.getReviewsForCourse);

/**
 * @swagger
 * /reviews/{id}:
 *   put:
 *     summary: Update an existing review
 *     tags:
 *       - Reviews
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the review to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 4
 *               comment:
 *                 type: string
 *                 example: "Updated review comment"
 *     responses:
 *       200:
 *         description: Review updated successfully
 *       400:
 *         description: Invalid request or validation error
 *       404:
 *         description: Review not found
 */
router.put('/:id', protect, reviewController.updateReview);

/**
 * @swagger
 * /reviews/{id}:
 *   delete:
 *     summary: Delete a review
 *     tags:
 *       - Reviews
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the review to delete.
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *       403:
 *         description: Not authorized to delete the review
 *       404:
 *         description: Review not found
 */
router.delete('/:id', protect, reviewController.deleteReview);

module.exports = router;
