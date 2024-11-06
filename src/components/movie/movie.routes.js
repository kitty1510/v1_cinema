const express = require('express');
const router = express.Router();

const {addShowtime, createMovie, getAllMovies,getMovieDetail, getReleasedMovies, getUpcomingMovies } = require('./movie.controller');

router.route('/')
    .get(getAllMovies)
    .post(createMovie);

router.route('/:id')
    .get(getMovieDetail)
    .patch(addShowtime);

router.route('/list/released')
    .get(getReleasedMovies);

router.route('/list/upcoming')
    .get(getUpcomingMovies);

module.exports = router;