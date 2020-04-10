db.movies.aggregate([
    {
        $match: {
            languages: { $in: ['English'] }
        }
    },
    {
        $project: {
            cast: 1, "imdb.rating": 1, _id: 0
        }
    },
    {
        $unwind: "$cast"
    },
    {
        $group: {
            _id: "$cast",
            numFilms: { $sum: 1 },
            average: { $avg: "$imdb.rating" }
        }
    },
    {
        $sort: {numFilms: -1}
    },
    {
        $limit: 1
    },
    {
        $project: { 
            numFilms: 1,
            average: {
                $trunc: ["$average", 1]
            }
        }
    }
])
