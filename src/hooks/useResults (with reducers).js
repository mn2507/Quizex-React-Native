import { useEffect, useState } from "react";
import opentdb from "../api/opentdb";

const categoryReducer = (state, action) => {
  switch (action.type) {
    case "get_id":
    return state.map(() =>{return })
    case "get_name":
  }
};

export default () => {
  const [amount, setAmount] = useState([]);
  const [category, setCategory] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const getAmount = async (amountInfo) => {
    try {
      const response = await opentdb.get(`/api.php?amount=${amountInfo}`);
      setAmount(response.data);
    } catch (e) {
      setErrorMessage("Something went wrong!");
    }
  };

  const getCategories = (dispatch) => {
    return async () => {
      const response = await opentdb.get("/api_category.php");
      dispatch(
        { type: "get_id", payload: response.data.id },
        { type: "get_name", payload: response.data.name }
      );
      //   dispatch({type:"get_name", payload:response.data.name})

      const responseCategory = setCategory(response.data);
      responseCategory.map((category) => {
        return { label: category.name, value: category.id };
      });
    };
  };

  useEffect(() => {
    getAmount("10");
    getCategories();
  }, []);

  return [getAmount, getCategories, amount, errorMessage, category];
};
