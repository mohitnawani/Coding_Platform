const problem = require("../models/problem");
const User = require("../models/user");
const SolutionVideo = require("../models/solutionVideo");

const {
  getLanguageById,
  submitBatch,
  submitToken,
} = require("../utils/problemUitlity");

const createProblem = async (req, res) => {
  console.log(req.body)
  const {
    title,
    description,
    difficulty,
    tags,
    visibleTestCases,
    hiddenTestCases,
    HiddenTestCases,
    startCode,
    StartCode,
    referenceSolution,
  } = req.body;

  // normalise field names from frontend to match schema
  const normalizedVisible = visibleTestCases ?? [];
  const normalizedHidden  = hiddenTestCases ?? HiddenTestCases ?? [];
  const normalizedStart   = (startCode ?? StartCode ?? []).map((s) => ({
    language: s.language,
    code: s.initialCode ?? s.code ?? "",
  }));

  try {
    for (const { language, completeCode } of referenceSolution ?? []) {
      const languageId = getLanguageById(language);
      // console.log(languageId);

      const submissions = normalizedVisible.map((testcase) => ({
        source_code: completeCode,
        language_id: languageId,
        stdin: testcase.input,
        expected_output: testcase.output,
      }));

        // console.log(submissions);

      const submitResult = await submitBatch(submissions);
      //   console.log(submitResult);

      const tokens = submitResult.map((value) => value.token);
      const finalresult = await submitToken(tokens);

      console.log(finalresult);

      for (const test of finalresult) {
        if (test.status_id != 3) return res.status(400).send("Error Occured");
      }
    }

    // console.log(req.body);
    console.log(req.result._id);

    const userProblem = await problem.create({
      title,
      description,
      difficulty,
      tags,
      visibleTestCases: normalizedVisible,
      HiddenTestCases: normalizedHidden,
      StartCode: normalizedStart,
      referenceSolution,
      problemCreator: req.result._id,
    });



    res.status(201).send("Problem Saved Successfully");
  } catch (err) {
    throw "error in creating problem" + err;
  }
};

const updateProblem = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    difficulty,
    tags,
    visibleTestCases,
    hiddenTestCases,
    startCode,
    referenceSolution,
    problemCreator,
  } = req.body;

  try {
    if (!id) {
      return res.status(400).send("Missing ID field");
    }
    const valid_id = await problem.findById(id);
    if (!valid_id) {
      return res.status(400).send("Missing ID field");
    }

    for ({ completeCode, language } of referenceSolution) {
      const languageId = getLanguageById(language);
      // console.log(languageId);

      const submissions = visibleTestCases.map((testcase) => ({
        source_code: completeCode,
        language_id: languageId,
        stdin: testcase.input,
        expected_output: testcase.output,
      }));

      const submitResult = await submitBatch(submissions);

      const tokens = submitResult.map((value) => value.token);
      const finalresult = await submitToken(tokens);

      for (const test of finalresult) {
        if (test.status_id != 3) return res.status(400).send("Error Occured");
      }
    }
    // console.log(req.body);

    const newProblem = await problem.findByIdAndUpdate(
      id,
      { ...req.body },
      { runValidators: true, new: true },
    );
    res.status(201).send(newProblem);
  } catch (err) {
    throw "error in creating problem" + err;
  }
};

const deletedProblem = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProblem = await problem.findByIdAndDelete(id);

    if (!deletedProblem) return res.status(404).json({ message: "Problem not found" });

    res.status(200).json({ message: "Problem deleted successfully", problem: deletedProblem });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};

const getProblemById = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) return res.status(400).json({ message: "ID is not provided" });

    userId = req.result._id;
    const foundProblem = await problem.findById(id);
    if (!foundProblem) return res.status(404).json({ message: "Problem not found" });
    const video = await SolutionVideo.findOne({ problemId: id }).lean();
    console.log("Video found for problem:", video);

    const responseData = {
      ...foundProblem.toObject(),userId,
      ...(video
        ? {
            secureUrl: video.secureUrl,
            thumbnailUrl: video.thumbnailUrl,
            duration: video.duration,
          }
        : {}),
    };

    console.log("Response Data:", responseData);
    return res.status(200).send(responseData);

  }catch (err) {
    res.status(500).json({ message: "Error: " + err.message });
  }
}

const getAllProblem = async (req,res)=>{
  try{
    const AllProblem= await problem.find({});

    if(!AllProblem) return res.status(404).send("Problems Not Found")

    res.status(200).send(AllProblem);
  } catch(err){
    res.status(500).send("Error :" + err);
  }
}

const solvedAllProblembyUser =async (req , res)=>{
  try{
    const userId =req.result._id;
    const user =await User.findById (userId).populate({
      path:'problemSolved',
      select : '_id title difficulty tags'
    })
    res.status(200).send(user.problemSolved);
  }

  catch(err)
  {
    res.status(500).send("Error :" + err);
  }
}





module.exports = { createProblem, updateProblem, deletedProblem, getProblemById, getAllProblem, solvedAllProblembyUser };
