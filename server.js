const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db_config');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger/swaggerOptions');
const courseRoutes = require('./routes/courseRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const authentication = require('./routes/authRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes');

const app = express();
app.use(express.json());
dotenv.config();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api/auth', authentication);
app.use('api/courses', courseRoutes);
app.use('/reviews', reviewRoutes);
app.use('/enrollments', enrollmentRoutes);


connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
