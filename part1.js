const mongoose = require('mongoose');
const connect = require('./start');
const Movie = require('./collections/movies');
const Review = require('./collections/reviews');

async function main() {
    await connect;

    // بنفضي الداتا كل مرة نشغل الفايل
    await Movie.deleteMany({});
    await Review.deleteMany({});

    // 1. Two collections, at least three documents in each.
    await Movie.insertMany([
        { _id: 1, title: 'Fight Club', genre: 'Drama', releaseYear: 1999, imdbRating: 8.8 },
        { _id: 2, title: 'Interstellar', genre: 'Sci-Fi', releaseYear: 2014, imdbRating: 8.7 },
        { _id: 3, title: 'Vanilla Sky', genre: 'Sci-Fi', releaseYear: 2001, imdbRating: 6.9 }
    ]);

    await Review.insertMany([
        { _id: 1, movieId: 1, comment: 'Gamed gmoda', rating: 10 },
        { _id: 2, movieId: 1, comment: 'Fager', rating: 9 },
        { _id: 3, movieId: 2, comment: 'Msh momken', rating: 8 }
    ]);
    console.log('Created 3 movies and 3 reviews (reviews 1 & 2 belong to movie 1).');

    // 2. Delete at least one document from each collection.
    await Movie.deleteOne({ _id: 3 });
    await Review.deleteOne({ _id: 3 });

    // 3. Add the 'Score' array to at least two documents in each collection.
    await Movie.updateMany({}, { $set: { Score: [1, 2, 3, 4] } });
    await Review.updateMany({}, { $set: { Score: [1, 2, 3, 4] } });

    // 4. _id = 1 -> 5 in the third position (index 2); otherwise 6 in the fourth (index 3).
    for (const Model of [Movie, Review]) {
        await Model.updateMany({ _id: 1 }, { $set: { 'Score.2': 5 } });
        await Model.updateMany({ _id: { $ne: 1 } }, { $set: { 'Score.3': 6 } });
    }

    // 5. Multiply every Score element by 20.
    const multiplyBy20 = [{
        $set: { Score: { $map: { input: '$Score', in: { $multiply: ['$$this', 20] } } } }
    }];
    await Movie.updateMany({}, multiplyBy20);
    await Review.updateMany({}, multiplyBy20);

    console.log('Movies:', JSON.stringify(await Movie.find(), null, 2));
    console.log('Reviews:', JSON.stringify(await Review.find(), null, 2));
}

main()
    .catch((err) => { console.error(err); process.exitCode = 1; })
    .finally(() => mongoose.connection.close());