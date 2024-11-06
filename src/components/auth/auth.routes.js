const express = require('express');
const router = express.Router();

const { validateParams, validateBody } = require('../../middleware/validation.js'); // Import validation middleware
const { userSchema } = require('../../schemas/user.schemas.js'); // Import user schema
const {idSchema} = require('../../schemas/id.schemas.js');

const {register} = require('./auth.controller');

// Register
router.route('/register')
    .post(validateBody(userSchema), register);

module.exports = router;