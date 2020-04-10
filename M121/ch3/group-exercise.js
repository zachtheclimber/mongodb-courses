db.movies.aggregate([
    {
        $match: {
            awards: {$exists: true}
        }
    },
    {
        $project: {
            _id: 0,
            "imdb.rating": 1,
            oscar: {
                $arrayElemAt: [
                    {
                        $split: ["$awards", " "]
                    },
                    0
                ]
            }
        }
    },
    {
        $match: {
            oscar: "Won"
        }
    },
    {
        $group: {
            _id: null,
            std_deviation: {
                $stdDevSamp: "$imdb.rating"
            },
            max_rating: {
                $max: "$imdb.rating"
            },
            min_rating: {
                $min: "$imdb.rating"
            },
            avg_rating: {
                $avg: "$imdb.rating"
            }
        }
    }
])

db.movies.aggregate([
    {
        $match: {
            awards: /Won \d{1,2} Oscars?/
        }
    },
    {
        $group: {
            _id: null,
            std_deviation: {
                $stdDevSamp: "$imdb.rating"
            },
            max_rating: {
                $max: "$imdb.rating"
            },
            min_rating: {
                $min: "$imdb.rating"
            },
            avg_rating: {
                $avg: "$imdb.rating"
            }
        }
    }
])
