import { useEffect, useState } from "react";
import opentdb from "../api/opentdb";

export default () => {
  const [questions, setQuestions] = useState([]);
  const [category, setCategory] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [responseCode, setResponseCode] = useState(0);

  // const getAmount = async (amountInfo) => {
  //   try {
  //     const response = await opentdb.get(`/api.php?amount=${amountInfo}`);
  //     setAmount(response.data); //use amount to set questions
  //   } catch (e) {
  //     setErrorMessage("Something went wrong!");
  //   }
  // };

  const getCategories = async () => {
    try{
    const response = await opentdb.get("/api_category.php");
    let categories = response.data.trivia_categories;
    categories = categories.map((category) => {
      return {
        value: category.id,
        label: category.name,
        selected: "false",
      };
    });
    categories.push({ value: -1, label: "Any", selected: "true" });
    setCategory(categories);
    // console.log(response.data.trivia_categories);
  } catch (e){
    console.log("getCategories " + e)
  }
  };

  const getQuestions = async (amount, category, difficulty, type) => {
    try {
      const response = await opentdb.get(
        `/api.php?amount=${amount}` +
          (category !== -1 ? `&category=${category}` : "") +
          (difficulty !== "any" ? `&difficulty=${difficulty}` : "") +
          (type !== "any" ? `&type=${type}` : "")
      );
      // console.log("response" + response.data.results)
  //    console.log("question response: " + response.data.results[0].question);
      // console.log("cat response: " + response.data.results[0].category);
   //   setQuestions(response.data.results);
  //    setResponseCode(response.data.response_code);
      return response.data;
      // console.log(response.data.response_code + "code");
    } catch (e) {
      setErrorMessage("Something went wrong! " + e);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return [getQuestions, questions, errorMessage, category, responseCode];
};
