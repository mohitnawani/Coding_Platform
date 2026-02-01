const problem = require("../models/problem");

const {
  getLanguageById,
  submitBatch,
  submitToken,
} = require("../utils/problemUitlity");

const createProblem = async (req, res) => {
  // console.log(req.body)
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
    for (const { language, completeCode } of referenceSolution) {
      const languageId = getLanguageById(language);
      // console.log(languageId);

      const submissions = visibleTestCases.map((testcase) => ({
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

    const userProblem = await problem.create({
      ...req.body,
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
    if (!id) return res.status(400).send("This id is not present");

    const Deleted_Id = await problem.findByIdAndDelete(id);
    if (!Deleted_Id) return res.status(404).send("problem is not present");

    res.status(200).send("Problem is deleted SucessFully");
  } catch (err) {
    res.status(500).send("Error: " + err);
  }
};

const getProblemById = async (req, res) => {
  const { id } = req.params;

  try {
    if(!id) return res.status(400).send("ID is not Correct")

      const GetById=await problem.findById(id);
      if(!GetById) return res.staus(400).send("Problem is not present");

      res.status(2000).send(GetById);
  } 

  catch (err) {
    res.status(500).send("Error: " + err);
  }
};

const getAllProblem = async (req,res)=>{
  try{
    const AllProblem= await problem.find({});

    if(!AllProblem) return res.status(404).send("Problems Not Found")

      res.status(200).send(AllProblem);
}

  catch(err){
    res.status().send()("Error :"+err) 
  }
}

const solvedAllProblembyUser =async (req , res)=>{
  try{
    const userId =req.result._id;
    const user =await User.findById (userId).populate('problemSolved')
    res.status(200).send(user.problemSolved);
  }

  catch(err)
  {
    res.status(500).send("Error :" + err);
  }
}





module.exports = { createProblem, updateProblem, deletedProblem,getProblemById,getAllProblem,solvedAllProblembyUser};
