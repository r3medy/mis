const { Schema, model } = require('mongoose');

/* Review schema
 *
 *  _id: Number, required, unique
 * movieId: ObjectId of the movie being reviewed, required
 * comment: String, optional
 * rating: Number, optional
 */
const reviewSchema = new Schema({
    _id: Number,
    movieId: { type: Number, ref: 'Movie', required: true },
    comment: String,
    rating: Number,
    Score: [Number]
});

module.exports = model('Review', reviewSchema); // changed: was `export default`
