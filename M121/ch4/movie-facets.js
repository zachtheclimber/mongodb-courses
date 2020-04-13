db.movies.aggregate([
    {
        $match: {
            "imdb.rating": { $gt: 0 },
            metacritic: { $gt: 0}

        }
    },
    {
        $project: {
            "metacritic": 1,
            imdb: "$imdb.rating",
            title: 1,
            _id: 0
        }
    },
    {
        $facet: {
            "imdb": [
                { $sort: { "imdb": -1 } },
                { $limit: 10 },
                { $project: { title: 1 } }
            ],
            "metacritic": [
                { $sort: { "metacritic": -1 } },
                { $limit: 10 },
                { $project: { title: 1 } }
            ]
        }
    },
    {
        $project: {
            "movies_in_both_top_10s": { $setIntersection: [ "$imdb", "$metacritic"] }
        }
    }
])
