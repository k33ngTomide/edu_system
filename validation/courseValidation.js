// validations/courseValidation.js

const Joi = require('joi');

const courseValidation = (data) => {
    const schema = Joi.object({
        title: Joi.string().min(3).max(100).required(),
        price: Joi.number().positive().required(),
        aboutCourse: Joi.string().required(),
        instructor: Joi.string().required(),
        author: Joi.string().required(),
        rating: Joi.number().min(0).max(5),
        languages: Joi.array().items(Joi.string()).required(),
        level: Joi.string().valid('Beginner', 'Intermediate', 'Advanced').required(),
        skillsToGain: Joi.array().items(Joi.string()).required(),
        syllabus: Joi.object().required(),
    });
    return schema.validate(data);
};

module.exports = courseValidation;
