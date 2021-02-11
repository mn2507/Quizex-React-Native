import { useEffect, useState } from "react";
import opentdb from "../api/opentdb";

export default () => {
  const [amount, setAmount] = useState([]);
  const [category, setCategory] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const getAmount = async (amountInfo) => {
    try {
      const response = await opentdb.get(`/api.php?amount=${amountInfo}`);
      setAmount(response.data);
    } catch (e) {
      setErrorMessage("Something went wrong!");
    }
  };

  const getCategories = async () => {
    const response = await opentdb.get("/api_category.php");
    setCategory(response.data.trivia_categories);
    // console.log(response.data.trivia_categories)
  };

  useEffect(() => {
    getAmount("10");
    getCategories();
  }, []);

  return [getAmount, amount, errorMessage, category];
};
