db.air_routes.aggregate([
    {
        $match: {
            airplane: {$in: ['747', '380']}
        }
    },
    {
        $project: {
            _id: 0, airline: "$airline.name"
        }
    },
    {
        $lookup: {
            from: "air_alliances",
            localField: "airline",
            foreignField: "airlines",
            as: "alliance"
        }
    },
    {
        $project: {
            alliance: "$alliance.name",
            airline: 1
        }
    },
    {
        $group: {
            _id: "$alliance",
            routes: { $sum: 1 }
        }
    },
    {
        $sort: { routes: -1 }
    }
])
