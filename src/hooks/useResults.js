import { useEffect, useState } from "react";
import opentdb from "../api/opentdb";

export default () => {
  const [questions, setQuestions] = useState([]);
  const [category, setCategory] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [responseCode, setResponseCode] = useState(0);

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
      return response.data;
    } catch (e) {
      setErrorMessage("Something went wrong! " + e);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return [getQuestions, questions, errorMessage, category, responseCode];
};
