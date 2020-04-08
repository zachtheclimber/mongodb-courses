db.movies.aggregate([
    {
        $match: {
            languages: { $in: ["English"] },
            "imdb.rating": { $gte: 1 },
            year: { $gte: 1990 }
        }
    },
    {
        $project: {
            _id: 0,
            title: 1,
            "imdb.rating": 1,
            "imdb.votes": 1
        }
    },
    {
        $addFields: {
            normalized_rating: {
                $avg: [
                {
                    $add: [
                        1,
                        {
                            $multiply: [
                                9,
                                {
                                    $divide: [
                                        { $subtract: ["$imdb.votes", 5] },
                                        { $subtract: [1521105, 5]}
                                    ]

                                }
                            ]
                        }

                    ]
                },
                "$imdb.rating"
                ]
            }
        }
    },
    { $sort: { normalized_rating: 1 } }
])
