# edu_system
# Summary of the Task
For this task, I implemented a backend system using Node.js and MongoDB, which provides the necessary API endpoints for the education system. Here's a summary of the work done:

Authentication:Implemented sign-up and login functionalities using email and password with JWT-based authentication.
Courses API: Created CRUD operations for courses, allowing for the creation, retrieval, update, and deletion of courses. Course attributes include title, price, about course, instructor, rating, languages, level, skills to gain, and syllabus.
Reviews API: Implemented CRUD operations for reviews on courses.
Enrollments API: Added CRUD operations for user enrollments in courses, allowing users to enroll, view enrollments, and cancel enrollment from courses.

# Tools and Technologies Used
Joi Validation: Implemented Joi for input validation to ensure data integrity and provide protection against SQL injection and malformed requests.
Swagger API Documentation: Integrated Swagger for comprehensive API documentation, making it easier to interact with the API and test the endpoints. The Swagger documentation can be accessed at /api-docs.
Environment Variables: Managed sensitive information like database credentials and JWT secrets using environment variables, keeping the application secure.
Middleware: Added middleware for handling authentication and error handling, ensuring that requests are properly authenticated and any errors are gracefully handled.

# Models Implemented
User Model: Handles user data for authentication and authorization.
Course Model: Defines courses with attributes such as title, price, instructor, and syllabus.
Review Model: Manages user reviews for courses.
Enrollment Model: Handles the user-course enrollment data, tracking which users are enrolled in which courses.
