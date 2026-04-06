const express = require('express');
const SubmitRouter = express.Router();
const userMiddleware = require("../middleware/userMiddleware");
const {submitCode,runCode} = require("../controllers/userSubmission");



SubmitRouter.post("/submit/:id", userMiddleware, submitCode);
SubmitRouter.post("/run/:id", userMiddleware, runCode);

module.exports = SubmitRouter;
