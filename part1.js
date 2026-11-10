const Movie  = require('../models/movie');
const Review = require('../models/review');

// Inserting into movies collection (داتا ثابتة)
const insertIntoMovies = async () => {
    const fightClub = new Movie({
        title: 'Fight Club',
        genre: 'Drama',
        releaseYear: 1999,
        imdbRating: 8.8
    });
    await fightClub.save();

    const interstellar = new Movie({
        title: 'Interstellar',
        genre: 'Sci-Fi',
        releaseYear: 2014,
        imdbRating: 8.7
    });
    await interstellar.save();

    const vanillaSky = new Movie({
        title: 'Vanilla Sky',
        genre: 'Sci-Fi',
        releaseYear: 2001,
        imdbRating: 6.9
    });
    await vanillaSky.save();
};

// Inserting into reviews collection (داتا ثابتة)
const insertIntoReviews = async () => {
    const fightClubReview = new Review({
        movieId: (await Movie.findOne({ title: 'Fight Club' }))._id,
        comment: 'film fager',
        rating: 9
    });
    await fightClubReview.save();

    const interstellarReview = new Review({
        movieId: (await Movie.findOne({ title: 'Interstellar' }))._id,
        comment: 'y5rbet elgmdan',
        rating: 10
    });
    await interstellarReview.save();

    const vanillaSkyReview = new Review({
        movieId: (await Movie.findOne({ title: 'Vanilla Sky' }))._id,
        comment: 'unexpected plot twist mn romance to sci-fi',
        rating: 8
    });
    await vanillaSkyReview.save();
};

// IIFE, ننفذ
(async () => {
    // Create two collections and create at least three documents in each one.
    await insertIntoMovies();
    await insertIntoReviews();

    // Delete at least one document from each collection
    await Movie.deleteOne({ title: 'Vanilla Sky' });
    console.log("Vanilla Sky movie deleted.");
    await Review.deleteOne({ comment: 'unexpected plot twist mn romance to sci-fi' });
    console.log("Review for Vanilla Sky deleted.");

    // Update at least two documents [add an array called ‘Score’] in each collection.
    // دول ارقام عشوائية
    await Movie.updateMany({}, {
        $set: { score: [9, 7, 8, 4, 2] }
    });
    await Review.updateMany({}, {
        $set: { score: [4, 9, 7, 2, 8] }
    });
    console.log("Scores updated for movies and reviews.");

    // If the ‘_id’ of the document =1 update the array called ‘Score’ and
    // put number 5 in the third position of the array if not put number 6 in the fourth position.
    // مش عارف استعمل انهي كولكشن فهستعمل الافلام
    // السؤال مش واضح اوي بس عملت اللي فهمته
    const movieId1 = await Movie.findById('1');
    if(movieId1) {
        await Movie.findOneAndUpdate({ _id: '1' }, { $set: { score: [9, 7, 5, 4, 2] } });
        console.log("Score updated for movie with _id = 1.");
    } else {
        await Movie.findOneAndUpdate({ _id: { $ne: '1' } }, { $set: { score: [9, 7, 8, 6, 2] } });
        console.log("Score updated for movie with _id != 1.");
    }

    // Multiply each element in the array called ‘Score’ by 20.
    const allMovies  = await Movie.find({});
    for(let movie of allMovies) {
        movie.score.map(score => score * 20);
        await movie.save();
    }
    const allReviews = await Review.find({});
    for(let review of allReviews) {
        review.score.map(score => score * 20);
        await review.save();
    }
    console.log("Scores multiplied by 20 for movies and reviews.");
})();