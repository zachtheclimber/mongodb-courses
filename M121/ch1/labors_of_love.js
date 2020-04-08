db.movies.aggregate([
    {$match:
        {cast: {$elemMatch: {$exists: true}},
         directors: {$elemMatch: {$exists: true}},
         writers: {$elemMatch: {$exists: true}}
         }
     },

    {$project:
        {writers:
            {$map:
                {input: "$writers",
                    as: "writer",
                    in:
                    {$arrayElemAt:
                        [
                            {$split: ["$$writer", " ("]},
                            0
                        ]
                     }
                 }
             },
         cast: 1,
         directors: 1,
         _id: 0,
         }
     },

    {$project:
        {labor_of_love:
            {$gt: [{$size: {$setIntersection: ["$cast", "$directors", "$writers"]}}, 0]}
         }
     },

    {$match:
        {labor_of_love: true}
     },

    {$count: "labors of love"}

])
