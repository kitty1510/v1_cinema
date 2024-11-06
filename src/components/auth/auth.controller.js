const userServices = require('../user/user.services');
//const authService = require('./auth.services');
//

// Register
const register = async (req, res) => {
    try {
        const newUser = await userServices.createUser(req.body);

        res.status(201).json({ user: newUser, token });
    } catch (error) {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }

        return res.status(500).json({ error: error.message });
    }
}


module.exports = {
    register,
};