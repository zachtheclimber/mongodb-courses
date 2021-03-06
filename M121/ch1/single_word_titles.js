db.movies.aggregate([
    {
        $project: {
            _id: 0,
            title: {
                $split: ["$title", " "]
            }
        }
     },
    {
        $match: {
            title: { $size: 1 }
        }
    }
])
