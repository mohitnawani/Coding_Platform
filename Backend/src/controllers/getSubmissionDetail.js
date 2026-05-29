
const submission = require('../models/submission');

const getSubmissionDetail = async (req, res) => {

    try{
        const {problemId} = req.params;
        const userId = req.result?._id || req.user?._id || req.params.userId;
        console.log("Received request for submission detail with problemId:", problemId, "and userId:", userId);

        if(!problemId || !userId){
            return res.status(400).json({error: "Missing required fields: problemId, userId"});
        }

        const submissions = await submission
            .find({ userId, problemId })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            submissions,
        });

    }


    catch (error) {
        console.error("Error fetching submission detail:", error);
        res.status(500).json({error: "error fetching submission detail"}); 
    }
}

module.exports ={getSubmissionDetail}