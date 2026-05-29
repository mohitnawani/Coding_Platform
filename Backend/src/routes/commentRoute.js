const express = require('express');
const commentRouter = express.Router();
const userMiddleware = require('../middleware/userMiddleware');
const {addComment, getCommentsByProblemId} = require('../controllers/commentController');

commentRouter.post("/add", userMiddleware, addComment);
commentRouter.get("/problem/:problemId", userMiddleware, getCommentsByProblemId);

module.exports = commentRouter;