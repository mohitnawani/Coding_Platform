import axiosClient from './axiosClient';

// Execute visible runtest cases for a problem
const submitcode = async (userCode, language, problemId) => {
  try {
    const langForApi = language === 'cpp' ? 'c++' : language;
    const response = await axiosClient.post(`/submission/submit/${problemId}`, {
      code: userCode,
      language: langForApi,
    });
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default submitcode;
