const express = require('express');

const axios = require('axios');

const router = express.Router();

const {WEB_URL} = require('./config/env.js');

// Import routes    
const userRoutes = require('./components/user/user.routes');
const authRoutes = require('./components/auth/auth.routes');
const movieRoutes = require('./components/movie/movie.routes');

// User routes
router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/movies', movieRoutes);

router.get('/',async (req, res) => {
    try {
        const response = await axios.get(`${WEB_URL}/movies/list/released`);
        res.render('index', { movies: response.data.movies });
    } catch (error) {
        console.error(error);
    }
});

router.get('/detail/:id', async (req, res) => {
    try {
        const movieId = req.params.id; // Lấy id từ URL
        const response = await axios.get(`${WEB_URL}/movies/${movieId}`);
        
        res.render('movies', { movie: response.data.movie }); // Trả về chi tiết của một phim
    } catch (error) {
        
        console.error(error);
    }
});

router.get('/register', (req, res) => {
    try {
        res.render('register');
    } catch (error) {
        console.error(error);
    }
});




module.exports = router;
