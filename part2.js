use mis

// Q1
// One-to-many: movies._id == reviews.movieId.

// Q2
db.movies.aggregate([
  {
    $lookup: {
      from: "reviews",
      localField: "_id",
      foreignField: "movieId",
      as: "reviews"
    }
  }
]).pretty();