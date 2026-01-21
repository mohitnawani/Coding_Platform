const problem= require('../models/problem');
const {languageId,submitbatch}= require('../utils/problemUitlity');


const createProblem = async (req,res)=>{

    const {title,description,difficulty,tags,
        visibleTestCases,hiddenTestCases,startCode,
        referenceSolution, problemCreator
    } = req.body;

    try {

        for(const {language,completeCode} of referenceSolution)
        {
            const languageId =languageId(language);


            const submissions = visibleTestCases.map((testcase)=>({
                source_code:completeCode,
                language_id: languageId,
                stdin: testcase.input,
                expected_output: testcase.output
                }))
        }

        const submitResult = await submitbatch(submissions);

    }

    catch(err)
    {
        throw "error is Creating problem"+err; 
    }
}