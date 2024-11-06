const mongoose = require('mongoose');

const showtimeSchema = new mongoose.Schema({
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    },
    showAt: {
        type: Date,
        required: true
    }
},
{
    timestamps: true
});

const Showtime = mongoose.model('Showtime', showtimeSchema);

module.exports = Showtime;