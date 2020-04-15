db.air_routes.aggregate([
    {
        $match: {
            src_airport: {$in: ["JFK", "LHR"]},
            dst_airport: {$in: ["JFK", "LHR"]}
        }
    },
    {
        $group: {
            _id: "$airline.name"
        }
    },
    {
        $lookup: {
            from: "air_alliances",
            localField: "_id",
            foreignField: "airlines",
            as: "alliance"
        }
    },
    {
        $match: {
            alliance: {$ne: []}
        }
    },
    {
        $sortByCount: "$alliance.name"
    }
])
