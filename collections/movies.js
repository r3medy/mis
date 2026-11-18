const { Schema, model } = require('mongoose');

/* Movie schema
 * _id: Number, required, unique
 * title: String, required, trimmed
 * genre: enum, required, one of: Action, Comedy, Drama, Horror, Romance, Sci-Fi
 * releaseYear: Number, required, min: 1900, max: current year
 * imdbRating: Number, optional, min: 0, max: 10
 */
const movieSchema = new Schema({
    _id: { type: Number, required: true, unique: true },
    title: { type: String, required: true, trim: true },
    genre: {
        type: String,
        required: true,
        enum: ['Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Sci-Fi']
    },
    releaseYear: { type: Number, required: true, min: 1900, max: new Date().getFullYear() },
    imdbRating: { type: Number, min: 0, max: 10 },
    Score: [Number]
});

module.exports = model('Movie', movieSchema);
