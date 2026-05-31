const express = require('express');
const commentRouter = express.Router();
const userMiddleware = require('../middleware/userMiddleware');
const {addComment,getComments} = require('../controllers/commentController');

commentRouter.post("/add", userMiddleware, addComment);
commentRouter.get("/get/:problemId", userMiddleware, getComments);

module.exports = commentRouter;