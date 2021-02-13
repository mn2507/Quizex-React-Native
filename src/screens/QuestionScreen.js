import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import useResults from "../hooks/useResults";

const QuestionScreen = ({ navigation }) => {

var [questions, setQuestions] = useState([])

  const [
    getQuestions,
    questions1,
    errorMessage,
    category,
    responseCode,
  ] = useResults();

  useEffect(() => {

    getQuestions(
      navigation.getParam("amount"),
      navigation.getParam("categoryId"),
      navigation.getParam("difficulty"),
      navigation.getParam("type"),
    ).then(function(result) {
      setQuestions(result)
  });
  }, []);

  // const filterResultsByQuestions = (question) => {
  //   return questions.filter((Question) => {
  //     return Question.question === question;
  //   });
  // };

 if(questions.length===0)
 {
  return (
    <View>
      <Text>Test</Text>
    </View>
  );
 }
 else{
  return (
    <View>
      <Text>{questions[0].question}</Text>
      <Text>{questions[0].correct_answer}</Text>
      <Text>{questions[0].incorrect_answer}</Text>
      <Text>{questions[0].question}</Text>
    </View>
  );
 }

};

const styles = StyleSheet.create({});

export default QuestionScreen;
