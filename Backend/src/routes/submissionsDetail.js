const express = require('express');
const submissionDetailRouter = express.Router();
const userMiddleware = require("../middleware/userMiddleware");

const {getSubmissionDetail} = require("../controllers/getSubmissionDetail");

submissionDetailRouter.get("/:problemId", userMiddleware, getSubmissionDetail);

module.exports = submissionDetailRouter;
