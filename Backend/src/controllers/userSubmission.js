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

    // Validation
    if (!userId || !code || !problemId || !language) {
      return res.status(400).json({ 
        error: "Missing required fields: code, language, problemId" 
      });
    }

    const Problem_Data = await problem.findById(problemId);
    if (!Problem_Data) {
      return res.status(404).json({ error: "Problem not found" });
    }

    // Create pending submission
    const submittedResult = await submission.create({
      userId,
      problemId,
      code,
      language,
      status: "pending",
      testCasesTotal: Problem_Data.HiddenTestCases.length
    });

    try {
      const langauage_id = getLanguageById(language);
      
      if (!langauage_id) {
        throw new Error("Unsupported language");
      }

      const submissions = Problem_Data.HiddenTestCases.map((testcase) => ({
        source_code: code,
        language_id: langauage_id,
        stdin: testcase.input,
        expected_output: testcase.output,
      }));

      const submitResult = await submitBatch(submissions);
      
      if (!submitResult || submitResult.length === 0) {
        throw new Error("Failed to submit code for testing");
      }

      const resultToken = submitResult.map((value) => value.token);
      const testResult = await submitToken(resultToken);

      if (!testResult || testResult.length === 0) {
        throw new Error("Failed to get test results");
      }

      // Process results
      let testCasesPassed = 0;
      let runtime = 0;
      let memory = 0;
      let status = "accepted";
      let errorMessage = null;

      for (const test of testResult) {
        // Status IDs: 3 = Accepted, 4 = Compilation Error, 5 = Runtime Error, 6 = Wrong Answer
        if (test.status_id === 3) {
          testCasesPassed++;
          runtime += parseFloat(test.time || 0);
          memory = Math.max(memory, test.memory || 0);
        } else if (test.status_id === 4) {
          status = "compilation_error";
          errorMessage = test.compile_output || "Compilation failed";
          break; // Stop on first error
        } else if (test.status_id === 5) {
          status = "runtime_error";
          errorMessage = test.stderr || "Runtime error occurred";
          break;
        } else {
          status = "wrong_answer";
          errorMessage = `Test case ${testCasesPassed + 1} failed`;
          break;
        }
      }

      submittedResult.status = status;
      submittedResult.testCasesPassed = testCasesPassed;
      submittedResult.testCasesTotal = testResult.length;
      submittedResult.errorMessage = errorMessage;
      submittedResult.runtime = (runtime / testCasesPassed) || 0; // Average runtime
      submittedResult.memory = memory;
      await submittedResult.save();

      // Add to problemSolved
      if (status === "accepted" && !req.result.problemSolved.includes(problemId)) {
        req.result.problemSolved.push(problemId);
        await req.result.save();
      }

      return res.status(200).json(submittedResult);

    } catch (testError) {
      // Update submission with error
      submittedResult.status = "error";
      submittedResult.errorMessage = testError.message || "Testing service error";
      await submittedResult.save();
      
      return res.status(400).json({
        error: testError.message || "Code submission failed",
        submissionId: submittedResult._id
      });
    }

  } catch (err) {
    console.error("Submit Code Error:", err);
    return res.status(500).json({ 
      error: "Server error: " + (err.message || err) 
    });
  }
};

const runCode = async (req, res) => {
  try {
    const userId = req.result._id;
    const problemId = req.params.id;
    const { code, language } = req.body;

    if (!userId || !code || !problemId || !language) {
      return res.status(400).json({ 
        error: "Missing required fields" 
      });
    }

    const Problem_Data = await problem.findById(problemId);
    if (!Problem_Data) {
      return res.status(404).json({ error: "Problem not found" });
    }

    try {
      const langauage_id = getLanguageById(language);
      
      if (!langauage_id) {
        return res.status(400).json({ error: "Unsupported language" });
      }

      const submissions = Problem_Data.visibleTestCases.map((testcase) => ({
        source_code: code,
        language_id: langauage_id,
        stdin: testcase.input,
        expected_output: testcase.output,
      }));

      const submitResult = await submitBatch(submissions);
      const resultToken = submitResult.map((value) => value.token);
      const testResult = await submitToken(resultToken);

      // Check for errors
      for (const test of testResult) {
        if (test.status_id === 4) {
          return res.status(400).json({
            error: "Compilation Error",
            message: test.compile_output || test.stderr,
            results: testResult
          });
        } else if (test.status_id === 5) {
          return res.status(400).json({
            error: "Runtime Error",
            message: test.stderr || "Runtime error occurred",
            results: testResult
          });
        } else if (test.status_id !== 3) {
          return res.status(400).json({
            error: "Test Failed",
            message: "One or more test cases failed",
            results: testResult
          });
        }
      }

      return res.status(200).json(testResult);

    } catch (testError) {
      console.error("Run Code Error:", testError);
      return res.status(400).json({
        error: testError.message || "Testing service unavailable"
      });
    }

  } catch (err) {
    console.error("Run Code Error:", err);
    return res.status(500).json({ 
      error: "Server error" 
    });
  }
};

module.exports = { submitCode, runCode };

