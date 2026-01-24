const problem= require('../models/problem');

const {getLanguageById,submitBatch,finalresult}= require('../utils/problemUitlity');


const createProblem = async (req,res)=>{

    const {title,description,difficulty,tags,
        visibleTestCases,hiddenTestCases,startCode,
        referenceSolution, problemCreator
    } = req.body;

    try {

        for(const {language,completeCode} of referenceSolution)
        {
            const languageId =getLanguageById(language);


            const submissions = visibleTestCases.map((testcase)=>({
                source_code:completeCode,
                language_id: languageId,
                stdin: testcase.input,
                expected_output: testcase.output
                }))
        }

        const submitResult = await submitBatch(submissions);

        const tokens = submitResult.map((value)=> value.token);
        const finalresult= await finalresult(tokens);
        


        for(const test of finalresult)
        {
            if(test.status_id!=3) 
            return res.status(400).send("Error Occured");
        }

        const userPrroblem =await problem.create({
            ...req.body,
            problemCreator: req.result._id
        });

        res.status(201).send("Problem Saved Successfully");
    }

    catch(err)
    {
        throw "error is Creating problem"+err; 
    }


}

module.exports={createProblem};