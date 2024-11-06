const showtimeModel = require('./showtime.model');
//

const CustomError = require('../../utils/CustomError');

const createShowtime = async (showtime) => {
    try {
        const newShowtime = new showtimeModel(showtime);
        return await newShowtime.save();
    }
    catch (error) {
        throw new Error(error);
    }
}


module.exports = {
    createShowtime
};