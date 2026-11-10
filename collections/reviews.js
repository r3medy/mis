const { Schema, model } = require('mongoose');

/* Review schema
 *
 * movieId: ObjectId of the movie being reviewed, required
 * comment: String, optional
 * rating: Number, optional
 */
const reviewSchema = new Schema({
    movieId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Movie'
    },
    comment: {
        type: String,
        required: false
    },
    rating: {
        type: Number,
        required: false
    }
});

export default model('Review', reviewSchema);