import { useEffect, useState } from "react";
import opentdb from "../api/opentdb";

export default () => {
  const [amount, setAmount] = useState([]);
  const [categoryName, setCategoryName] = useState([]);
  const [categoryId, setCategoryId] = useState([]);
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
    setCategoryId(response.data.id);
    setCategoryName(response.data.name);
  };

  useEffect(() => {
    getAmount("10");
    getCategories();
  }, []);

  return [getAmount, getCategories, amount, errorMessage, categoryName, categoryId];
};
