const express = require('express');
const router = express.Router();
const enrollmentController = require('../controller/enrollmentController');
const protect = require('../middleware/authMiddleware');

/**
 * @swagger
 * /enrollments:
 *   post:
 *     summary: Enroll the user in a course
 *     tags:
 *       - Enrollments
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               courseId:
 *                 type: string
 *                 example: 60c72bdf4f1a3c00178a29aa
 *     responses:
 *       201:
 *         description: User enrolled successfully
 *       400:
 *         description: Validation error or user already enrolled
 *       404:
 *         description: Course not found
 */
router.post('/', protect, enrollmentController.enrollInCourse);

/**
 * @swagger
 * /enrollments/user:
 *   get:
 *     summary: Get all enrollments for the logged-in user
 *     tags:
 *       - Enrollments
 *     responses:
 *       200:
 *         description: A list of enrollments
 *       500:
 *         description: Server error
 */
router.get('/user', protect, enrollmentController.getUserEnrollments);

/**
 * @swagger
 * /enrollments/course/{courseId}:
 *   get:
 *     summary: Get all users enrolled in a course
 *     tags:
 *       - Enrollments
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the course to get enrollments for
 *     responses:
 *       200:
 *         description: List of users enrolled in the course
 *       404:
 *         description: Course not found
 *       500:
 *         description: Server error
 */
router.get('/course/:courseId', protect, enrollmentController.getCourseEnrollments);

/**
 * @swagger
 * /enrollments/course/{courseId}:
 *   delete:
 *     summary: Unenroll a user from a course
 *     tags:
 *       - Enrollments
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the course to unenroll from
 *     responses:
 *       200:
 *         description: User unenrolled successfully
 *       404:
 *         description: Enrollment not found
 */
router.delete('/course/:courseId', protect, enrollmentController.deleteEnrollment);

module.exports = router;
