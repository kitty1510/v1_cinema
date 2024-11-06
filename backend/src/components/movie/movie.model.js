const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    releaseDate: {
        type: Date,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    cast: {
        type: [String],
        required: true
    },
    synopsis: {
        type: String,
        required: true
    },
    poster: {
        type: String,
        required: true
    },
    trailer: {
        type: String,
        required: true
    },
    ageRestriction: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    showtimes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Showtime'
    }]
},
{
    timestamps: true
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;