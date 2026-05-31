
const comments = require("../models/comments");
const user = require("../models/user");
const addComment = async (req , res)=>{
    try {
        const {problemId , content} = req.body;
        const userId = req.result._id
        const {firstName} = await user.findById(userId).select("firstName");
        if(!problemId || !content){
            return res.status(400).json({error: "Missing required fields: problemId, content"});
        }
        const newComment = await comments.create({
            problemId,
            content,
            userId,
            userName: `${firstName}`
        });
        res.status(201).json({message: "Comment added successfully", comment: newComment}); 
    }
    catch (error)
    {
        console.error("Error adding comment:", error);
        res.status(500).json({error: "Error adding comment"});
    }
}

const getComments = async(req , res)=>{
    try{
        const {problemId} = req.params;
        if(!problemId){
            return res.status(400).json({error: "Missing required field: problemId"});
        }

        const commentsList = await comments.find({problemId})
        res.status(200).json({comments: commentsList});
    }

    catch(error)
    {
        console.error("Error fetching comments:", error);
        res.status(500).json({error: "Error fetching comments"});
    }
}

module.exports = {addComment, getComments}

