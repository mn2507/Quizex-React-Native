import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import useResults from "../hooks/useResults";
import { AntDesign } from "@expo/vector-icons";

const QuestionScreen = ({ navigation }) => {
  var [questions, setQuestions] = useState([]);
  var [individualQuestion, setIndividualQuestion] = useState("");
  var [individualAnswer, setIndividualAnswers] = useState([]);
  var [correctAnswer, setCorrectAnswer] = useState([]);
  var [message, setMessage] = useState("");
  var [counter, setCounter] = useState(0);
  var [answeredCorrect, setAnsweredCorrect] = useState(0);
  var [finalScore, setFinalScore] = useState("");

  const TOTAL_QUESTIONS = navigation.getParam("amount");

  const [
    getQuestions,
    questions1,
    errorMessage,
    category,
    responseCode,
  ] = useResults();

  const NextQuestion = (questions) => {
    setCounter(counter + 1);
    var combineAnswers = questions[counter].incorrect_answers;
    combineAnswers.push(questions[counter].correct_answer);
    setIndividualQuestion(
      questions[counter].question.replace(/(&quot\;)/g, '"')
    );
    setCorrectAnswer(questions[counter].correct_answer);
    setIndividualAnswers(combineAnswers);
    console.log("counter" + counter);
  };

  // answeredCorrect[0]["answered"] = "Correctly";

  useEffect(() => {
    getQuestions(
      navigation.getParam("amount"),
      navigation.getParam("categoryId"),
      navigation.getParam("difficulty"),
      navigation.getParam("type")
    ).then(function (result) {
      setQuestions(result);
      NextQuestion(result);
    });
  }, []);

  if (!questions.length) {
    return (
      <View>
        <Text>Loading questions...</Text>
      </View>
    );
  } else if (!counter >= TOTAL_QUESTIONS) {
    return (
      <View>
        <Text>{individualQuestion}</Text>
        {individualAnswer.map((item, index) => (
          <Button
            title={item}
            key={index}
            onPress={() => {
              // var timer = setInterval(() => {
              NextQuestion(questions);
              // }, 1000);
              counter === TOTAL_QUESTIONS
                ? setFinalScore(answeredCorrect + "/" + TOTAL_QUESTIONS)
                : null;
              if (correctAnswer === item) {
                setMessage("You have answered correctly");
                // setAnsweredCorrect([counter]["answered"] = "correct");
                setAnsweredCorrect(answeredCorrect + 1);
                console.log("Chosen Answer", item);
                console.log("answercorrect: " + answeredCorrect);
                // clearInterval(timer);
              }
            }}
          ></Button>
        ))}
        <Text>{message}</Text>
        <Text>
          {counter}/{TOTAL_QUESTIONS}
        </Text>
        <Text>{finalScore}</Text>
      </View>
    );
  } else {
    return (
      <View>
        <Text>{finalScore}</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  iconStyle: {
    fontSize: 35,
    alignSelf: "center",
    marginHorizontal: 15,
  },
});

export default QuestionScreen;
