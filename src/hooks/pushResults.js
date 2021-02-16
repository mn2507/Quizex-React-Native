import React, { useState, useEffect } from "react";
import jsonServer from "../api/jsonServer";

export default () => {
  const [dbResults, setDbResults] = useState([]);

  // const GetResultsFromDb = () => {
  //   return async () => {
  //     const response = await jsonServer.get("/quizex_data");
  //     setDbResults(response.data);

  //   };
  // };

  const GetResultsFromDb = async () => {
    try {
      const response = await jsonServer.get("/quizex_data");
      setDbResults(response.data);
      // console.log("thedata:" + response.data);
    } catch (e) {
      console.log("getDBError: " + e);
    }
  };

  // const AddResultsToDb2 = () => {
  //   return async (completedTime, finalScore) => {
  //     await jsonServer.post("/quizex_data", {
  //       completedTime,
  //       finalScore,
  //     });
  //   };
  // };

  const AddResultsToDb = async (completedTime, finalScore) => {
    try {
      await jsonServer.post("/quizex_data", {
        completedTime,
        finalScore,
      });
    } catch (e) {
      console.log("postDBError: " + e);
    }
  };

  useEffect(() => {
    GetResultsFromDb();
  }, []);

  // {
  //   console.log("getDB");
  // }

  return [AddResultsToDb, dbResults];
};
