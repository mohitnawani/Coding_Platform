const problem = require("../models/problem");
const submission = require("../models/submission");
const problemRouter = require("../routes/problemCreator");

const {
  getLanguageById,
  submitBatch,
  submitToken,
} = require("../utils/problemUitlity");

const submitCode = async (req, res) => {
  try {
    const userId = req.result._id;
    const problemId = req.params.id;

    const { code, language } = req.body;
    // console.log(language);

    if (!userId || !code || !problemId || !language)
      return res.status(400).send("some field missing");

    const Problem_Data = await problem.findById(problemId);

    // console.log(Problem_Data);

    if (!Problem_Data) {
      return res.status(404).send("Problem not found");
    }

    // console.log(Problem_Data.HiddenTestCases)

    const submittedResult = await submission.create({
      userId,
      problemId,
      code,
      language,
      status: "pending",
      Totaltestcases: Problem_Data.HiddenTestCases.length
    });

    const langauage_id = getLanguageById(language);
    const submissions = Problem_Data.HiddenTestCases.map((testcase) => ({
      source_code: code,
      language_id: langauage_id,
      stdin: testcase.input,
      expected_output: testcase.output,
    }));

    // console.log(submissions);

    const submitResult = await submitBatch(submissions);
        
    const resultToken = submitResult.map((value)=> value.token);
    
    const testResult = await submitToken(resultToken);



    console.log(testResult)


    let testCasesPassed = 0;
    let runtime = 0;
    let memory = 0;
    let status = 'accepted';
    let errorMessage = null;

    console.log(testResult);


    for(const test of testResult){
        if(test.status_id==3){
           testCasesPassed++;
           runtime = runtime+parseFloat(test.time)
           memory = Math.max(memory,test.memory);
        }else{
          if(test.status_id==4){
            status = 'error'
            errorMessage = test.stderr
          }
          else{
            status = 'wrong'
            errorMessage = test.stderr
          }
        }
    }

    submittedResult.status   = status;
    submittedResult.testCasesPassed = testCasesPassed;
    submittedResult.errorMessage = errorMessage;
    submittedResult.runtime = runtime;
    submittedResult.memory = memory;
    await submittedResult.save();

    if(!req.result.problemSolved.includes(problemId))
    {
      req.result.problemSolved.push(problemId);
      await req.result.save();
    }

    return res.status(200).send("Submission received");

  } catch (err) {
    throw "ERROR" + err;
  }
};

const runCode = async (req, res) => {
  try {
    const userId = req.result._id;
    const problemId = req.params.id;

    const { code, language } = req.body;
    // console.log(language);

    if (!userId || !code || !problemId || !language)
      return res.status(400).send("some field missing");

    const Problem_Data = await problem.findById(problemId);

    // console.log(Problem_Data);

    if (!Problem_Data) {
      return res.status(404).send("Problem not found");
    }

    // console.log(Problem_Data.HiddenTestCases)


    const langauage_id = getLanguageById(language);
    const submissions = Problem_Data.visibleTestCases.map((testcase) => ({
      source_code: code,
      language_id: langauage_id,
      stdin: testcase.input,
      expected_output: testcase.output,
    }));

    // console.log(submissions);

    const submitResult = await submitBatch(submissions);
        
    const resultToken = submitResult.map((value)=> value.token);
    
    const testResult = await submitToken(resultToken);

    console.log(testResult)

      for (const test of testResult) {
        if (test.status_id != 3) return res.status(400).send("Error Occured");
      }

    return res.status(200).send("problem run successfully");

  } catch (err) {
    throw "ERROR" + err;
  }
};

module.exports = { submitCode, runCode };

