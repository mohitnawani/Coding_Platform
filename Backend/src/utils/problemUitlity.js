const axios = require("axios");

const getLanguageById = (lang) => {
  const language = {
    "c++": 54,
    java: 62,
    javascript: 63,
  };
  return language[lang.toLowerCase()];
};

const toBase64 = (text = "") => Buffer.from(text, "utf-8").toString("base64");

// const async timer(()=>{

// })

const waiting = async(timer)=>{
  setTimeout(()=>{
    return 1;
  },timer);
}

const submitBatch = async (submissions) => {
  // console.log(submissions);
  const encodedSubmissions = submissions.map((s) => ({
    ...s,
    source_code: toBase64(s.source_code),
    stdin: toBase64(s.stdin),
    expected_output: toBase64(s.expected_output ?? ""),
  }));

const options = {
  method: 'POST',
  url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
  params: {
    base64_encoded: 'true'
  },
  headers: {
    'x-rapidapi-key': '079b3b05d7msha3a735d42296d05p1c42e0jsn0f817c38907c',
    'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
    'Content-Type': 'application/json'
  },
  data: {
    submissions: encodedSubmissions
  }
};

  async function fetchData() {
    try {
      const response = await axios.request(options);
      // console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  return await fetchData();
};


const submitToken = async (tokens) => {
  // console.log(tokens);
  const options = {
    method: "GET",
    url: "https://judge0-ce.p.rapidapi.com/submissions/batch",
    params: {
      tokens: tokens.join(","),
      base64_encoded: "false",
      fields: "*",
    },
    headers: {
      "x-rapidapi-key": "079b3b05d7msha3a735d42296d05p1c42e0jsn0f817c38907c",
      "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
    }
  };

  async function fetchData() {
    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  console.log("Fetching Results");  
  while (true) {
    const result = await fetchData();
    // console.log(result);

    const IsResultObtained = result.submissions.every((r) => r.status_id > 2);

    if (IsResultObtained) 
      return result.submissions;
    

    await waiting(1000);
  }
}

module.exports = { getLanguageById, submitBatch, submitToken };





