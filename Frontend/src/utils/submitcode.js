import axios from 'axios';

// Execute visible runtest cases for a problem
const submitcode = async (userCode, language, problemId) => {
  try {
    const langForApi = language === 'cpp' ? 'c++' : language;
    const response = await axios.post(
      `http://localhost:3000/submission/submit/${problemId}`,
      { code: userCode, language: langForApi },
      {
        // ensure auth cookies are sent
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default submitcode;
