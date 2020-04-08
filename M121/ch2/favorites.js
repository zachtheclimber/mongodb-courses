db.movies.aggregate([
    {$match:
        {countries: {$in: ["USA"]}, "tomatoes.viewer.rating": {$gte: 3}}
     },
    {$project:
        {_id: 0,
         title: 1,
         rating: "$tomatoes.viewer.rating",
         num_favs: {$size: {$ifNull: [{$setIntersection: ["$cast",
                                                          ["Sandra Bullock",
                                                           "Tom Hanks",
                                                           "Julia Roberts",
                                                           "Kevin Spacey",
                                                           "George Clooney"]]},
                                      []]}
                    }
         }
     },
    {$sort:
        {num_favs: -1, rating: -1, title: -1}
     },
    {$limit: 25}
])

db.movies.aggregate([
    {$match:
        {countries: {$in: ["USA"]}, "tomatoes.viewer.rating": {$gte: 3}}
     },
    {$project:
        {_id: 0,
         title: 1,
         rating: "$tomatoes.viewer.rating",
         num_favs: {$setIntersection: ["$cast", ["Sandra Bullock",
                                                 "Tom Hanks",
                                                 "Julia Roberts",
                                                 "Kevin Spacey",
                                                 "George Clooney"]]}
         }
     },
    {$sort:
        {num_favs: -1, rating: -1, title: -1}
     }
])

db.movies.aggregate([
    {$match:
        {countries: {$in: ["USA"]}, "tomatoes.viewer.rating": {$gte: 3}}
     },
    {$project:
        {_id: 0,
         title: 1,
         cast: 1,
         rating: "$tomatoes.viewer.rating",
         castSize: {$size: {$ifNull: ["$cast", []]}}
         }
     },
    {$sort:
        {num_favs: -1, rating: -1, title: -1}
     }
])
