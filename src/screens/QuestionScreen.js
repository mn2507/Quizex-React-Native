import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import useResults from "../hooks/useResults";
import { AntDesign } from "@expo/vector-icons";
import CountdownCircle from "react-native-countdown-circle";
import DateTimeSetter from "../components/DateTimeSetter";
import jsonServer from "../api/jsonServer";
import pushResults from "../hooks/pushResults";
import { Header } from "react-native/Libraries/NewAppScreen";

const QuestionScreen = ({ navigation }) => {
  var [questions, setQuestions] = useState([]);
  var [individualQuestion, setIndividualQuestion] = useState("");
  var [individualAnswer, setIndividualAnswers] = useState([]);

  var [correctAnswer, setCorrectAnswer] = useState([]);
  var [message, setMessage] = useState("");
  var [counter, setCounter] = useState(0);
  var [answeredCorrect, setAnsweredCorrect] = useState(1);
  var [finalScore, setFinalScore] = useState("");
  var [second, setSecond] = useState(10);
  var [completedTime, setCompletedTime] = useState("");

  var TOTAL_QUESTIONS = navigation.getParam("amount");

  const [
    getQuestions,
    questions1,
    errorMessage,
    category,
    responseCode,
  ] = useResults();
  const [currentDate] = DateTimeSetter();
  const [AddResultsToDb, dbResults] = pushResults();

  const NextQuestion = (questions) => {
    setCounter(counter + 1);
    setQuestions(questions);
    var combineAnswers = questions[counter].incorrect_answers;
    combineAnswers.push(questions[counter].correct_answer);
    setIndividualQuestion(
      questions[counter].question.replace(/(&quot\;)/g, '"')
    );
    setCorrectAnswer(questions[counter].correct_answer);
    setIndividualAnswers(combineAnswers);
    console.log("counter: " + counter);
  };

  // answeredCorrect[0]["answered"] = "Correctly";

  useEffect(() => {
    getQuestions(
      navigation.getParam("amount"),
      navigation.getParam("categoryId"),
      navigation.getParam("difficulty"),
      navigation.getParam("type")
    ).then(function (result) {
      NextQuestion(result);
    });
  }, []);

  if (!questions.length) {
    return (
      <View style={styles.container}>
        <Text>Loading questions...</Text>
      </View>
    );
  } else if (!responseCode == 0 || questions.length == null) {
    return (
      <View style={styles.container}>
        {console.log("Response code: " + responseCode)}
        <Text>Questions unavailable with these selection.</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.titleStyle}>
          {counter}/{TOTAL_QUESTIONS}
        </Text>
        <Text style={styles.questionStyle}>{individualQuestion}</Text>
        {individualAnswer.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              console.log(
                "counter + TOTAL_QUESTIONS: " + counter + " " + TOTAL_QUESTIONS
              );
              /**
              @description	IF QUIZ IS COMPLETED
             */
              if (counter == TOTAL_QUESTIONS) {
                setFinalScore(answeredCorrect + "/" + TOTAL_QUESTIONS);
                setCompletedTime(currentDate);
                var CompletedTime = currentDate;
                console.log("finalScore: " + finalScore);
                console.log("CompletedTime: " + CompletedTime);
                console.log("completedTime: " + completedTime);

                /**
              @description	NAVIGATE TO SCOREBOARD
             */
                setTimeout(() => {
                  navigation.navigate("ScoreBoard");
                }, 1000);
                AddResultsToDb(CompletedTime, finalScore);
                return;
              }
              /**
              @description	ANSWER VALIDATION
             */
              setSecond(10);
              console.log("countdown: " + second);
              correctAnswer === item
                ? (setAnsweredCorrect(answeredCorrect + 1),
                  setMessage("You have answered correctly"))
                : setMessage("You have answered incorrectly");

              // if (correctAnswer === item) {
              //   setAnsweredCorrect(answeredCorrect + 1);
              //   setMessage("You have answered correctly");
              // } else {
              //   setMessage("You have answered incorrectly");
              // }

              /**
              @description	DELAY TO NEXT QUESTION
             */
              setTimeout(() => {
                setMessage("");
                NextQuestion(questions);
              }, 1000);

              // setAnsweredCorrect([counter]["answered"] = "correct");
              // console.log("Chosen Answer", item);
              console.log("answercorrect: " + answeredCorrect);
            }}
          >
            <Text style={styles.answerStyle}>{item}</Text>
          </TouchableOpacity>
        ))}
        <Text>{message}</Text>
        {console.log("finalScore2: " + finalScore)}
        <Text>Final Score: {finalScore}</Text>
        {/* <CountdownCircle
          seconds={second}
          radius={40}
          style={styles.itemStyle}
          borderWidth={10}
          color="#ff003f"
          bgColor="#ffffff"
          onTimeElapsed={() => console.log("Timer habis")}
          textStyle={{ fontSize: 20 }}
        /> */}
      </View>
    );
  }
  <Header />;
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  questionStyle: {
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "italic",
    marginVertical: 10,
    alignSelf: "center",
    textAlign: "center",
  },
  titleStyle: {
    fontSize: 15,
    fontStyle: "italic",
    alignSelf: "center",
  },
  answerStyle: {
    marginVertical: 5,
    padding: 10,
    fontSize: 20,
    backgroundColor: "#E1DEDE",
    borderRadius: 5,
    fontWeight: "bold",
    color: "#0082FF",
    textAlign: "center",
  },
});

export default QuestionScreen;
