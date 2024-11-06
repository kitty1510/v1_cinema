const movieModel = require('./movie.model');


const CustomError = require('../../utils/CustomError');

const showtimeService = require('./showtime.service')

const createMovie = async (movie) => {
    try {
        const newMovie = new movieModel(movie);
        return await newMovie.save();
    }
    catch (error) {
        throw new Error(error);
    }
};

const addShowtime = async (movieId, showtime) => {
    try {
        const [day, month, yearAndTime] = showtime.split('/');
        const [year, time] = yearAndTime.split(' ');
        const formattedShowtime = new Date(`${year}-${month}-${day}T${time}:00`);
        const newShowtime = { movieId, showAt: formattedShowtime }; 

        const createdShowtime = await showtimeService.createShowtime(newShowtime);


        const updatedMovie = await movieModel.findByIdAndUpdate(
            movieId, 
            { $push: { showtimes: createdShowtime._id } }, 
            { new: true }
        );
        if (!updatedMovie) {
            throw new CustomError('Movie not found', 404);
        }
        return updatedMovie;
    }
    catch (error) {
        if (error instanceof CustomError) {
            throw error;
        }
        throw new Error(error);
    }
};

// Get all movies
const getAllMovies = async () => {
    try {
        const movies = await movieModel.find();
        if (!movies) {
            throw new CustomError('No movies found', 404);
        }
        return movies;
    }
    catch (error) {
        if (error instanceof CustomError) {
            throw error;
        }
        throw new Error(error);
    }
};

// get released movies
const getReleasedMovies = async () => {
    try {
        // Lấy các bộ phim đã phát hành và bao gồm showtimes
        const movies = await movieModel
            .find({ releaseDate: { $lt: new Date() } })  // Lọc phim đã phát hành
            .populate('showtimes');  // Populates showtimes mà không có điều kiện lọc trong populate

        // Lọc các bộ phim có ít nhất một buổi chiếu
        const filteredMovies = movies.filter(movie => movie.showtimes && movie.showtimes.length > 0);

        return filteredMovies;
    }
    catch (error) {
        if (error instanceof CustomError) {
            throw error;
        }
        throw new Error(error);
    }
};


// get upcoming movies
const getUpcomingMovies = async () => {
    try {
        // Lấy các bộ phim sắp phát hành và có ít nhất một buổi chiếu (showtime)
        const movies = await movieModel
            .find({ releaseDate: { $gt: new Date() } })  // Lọc phim sắp phát hành
            .populate({
                path: 'showtimes',
                match: { $exists: true, $ne: [] }  // Lọc các phim có showtimes (không rỗng)
            });
        
        // Trả về các bộ phim đã lọc (không cần phải lọc lại nữa)
        return movies;
    }
    catch (error) {
        if (error instanceof CustomError) {
            throw error;
        }
        throw new Error(error);
    }

};

const getMovieById = async (id) => {
    try {
        const movie = await movieModel.findById(id).populate('showtimes');

        if (!movie) {
            throw new CustomError('Movie not found', 404);
        }
        return movie;
    }
    catch (error) {
        if (error instanceof CustomError) {
            throw error;
        }
        throw new Error(error);
    }
}



module.exports = {
    createMovie,
    addShowtime,
    getMovieById,
    getAllMovies,
    getReleasedMovies,
    getUpcomingMovies,
};