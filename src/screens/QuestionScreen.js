import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import useResults from "../hooks/useResults";
import DateTimeSetter from "../components/DateTimeSetter";
import pushResults from "../hooks/pushResults";
import { Header } from "react-native/Libraries/NewAppScreen";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
var he = require("he");

const QuestionScreen = ({ navigation }) => {
  var [questions, setQuestions] = useState([]);
  var [individualQuestion, setIndividualQuestion] = useState("");
  var [individualAnswer, setIndividualAnswers] = useState([]);
  var [correctAnswer, setCorrectAnswer] = useState([]);
  var [correctMessage, setCorrectMessage] = useState("");
  var [wrongMessage, setWrongMessage] = useState("");
  var [counter, setCounter] = useState(0);
  var [answeredCorrect, setAnsweredCorrect] = useState(0);
  var [finalScore, setFinalScore] = useState("");
  var [second, setSecond] = useState(0);
  var [responseCode, setResponseCode] = useState(null);
  var [flag, setFlag] = useState(true);

  var TOTAL_QUESTIONS = navigation.getParam("amount");

  const [
    getQuestions,
    Questions,
    errorMessage,
    category,
    ResponseCode,
  ] = useResults();
  const [currentDate] = DateTimeSetter();
  const [AddResultsToDb, dbResults] = pushResults();

  const NextQuestion = (questions) => {
    setCounter(counter + 1);
    setQuestions(questions);
    var combineAnswers = questions[counter].incorrect_answers;
    combineAnswers.push(questions[counter].correct_answer);
    var shuffle = require("shuffle-array"),
      combineAnswers;
    shuffle(combineAnswers);
    var newCombineAnswers = combineAnswers.map((value, index) => {
      return he.unescape(value);
    });
    setIndividualQuestion(he.unescape(questions[counter].question));
    setCorrectAnswer(he.unescape(questions[counter].correct_answer));
    setIndividualAnswers(newCombineAnswers);
  };

  useEffect(() => {
    getQuestions(
      navigation.getParam("amount"),
      navigation.getParam("categoryId"),
      navigation.getParam("difficulty"),
      navigation.getParam("type")
    ).then(function (result) {
      var finalResponseCode = result.response_code;
      if (finalResponseCode != 0) {
        setResponseCode(result.response_code);
      } else {
        setResponseCode(0);
        NextQuestion(result.results);
      }
    });
  }, []);

  const QuestionsCompleted = () => {
    setAnsweredCorrect((state) => {
      setFinalScore(state + "/" + TOTAL_QUESTIONS);
      var FINAL_SCORE = state + "/" + TOTAL_QUESTIONS;
      setTimeout(() => {
        navigation.navigate("ScoreBoard");
      }, 1000);
      AddResultsToDb(currentDate, FINAL_SCORE);
      return;
    });
  };

  if (responseCode == null) {
    return (
      <View style={styles.LoadingContainer}>
        <Text style={styles.LoadingStyle}>Loading questions...</Text>
      </View>
    );
  } else if (responseCode == 1 || responseCode == 2 || responseCode == 3) {
    return (
      <View style={styles.container}>
        <Text>
          Questions unavailable with selected options.{"\n"}Please navigate back
          and try a different selection.
        </Text>
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
              /**
              @description	ANSWER VALIDATION
             */
              if (correctAnswer === item) {
                setAnsweredCorrect(answeredCorrect + 1);
                setCorrectMessage("CORRECT!");
              } else {
                setWrongMessage("WRONG!");
              }

              /**
              @description	IF QUIZ IS COMPLETED
             */
              if (counter == TOTAL_QUESTIONS) {
                setFlag(false);
                QuestionsCompleted();
              } else {
                setTimeout(() => {
                  setCorrectMessage("");
                  setWrongMessage("");
                  setSecond((prevKey) => prevKey + 1);
                  NextQuestion(questions);
                }, 500);
              }
            }}
          >
            <Text style={styles.answerStyle}>{item}</Text>
          </TouchableOpacity>
        ))}
        <View>
          <Text
            style={
              correctMessage
                ? styles.answerCorrectStyle
                : styles.answerWrongStyle
            }
          >
            {correctMessage}
            {wrongMessage}
          </Text>
        </View>

        <View style={styles.countdownTimerStyle}>
          <CountdownCircleTimer
            key={second}
            size={80}
            isPlaying
            duration={10}
            colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
            onComplete={() => {
              if (counter < TOTAL_QUESTIONS) {
                setCorrectMessage("");
                setWrongMessage("");
                setSecond((prevKey) => prevKey + 1);
                NextQuestion(questions);
                return [true, 1000];
              } else if (counter == TOTAL_QUESTIONS && flag == true) {
                QuestionsCompleted();
                return [false, 0];
              } else {
                return [false, 0];
              }
            }}
          />
        </View>
        <View style={styles.finalScoreContainer}>
          <Text style={styles.finalScoreStyle}>{finalScore}</Text>
        </View>
      </View>
    );
  }
  <Header />;
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  answerCorrectStyle: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
    color: "#6BD845",
    marginVertical: 10,
  },
  answerWrongStyle: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
    color: "#E63E3E",
    marginVertical: 10,
  },
  finalScoreContainer: {
    marginTop: 15,
    alignSelf: "center",
  },
  finalScoreHeader: {
    fontSize: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
  finalScoreStyle: {
    fontWeight: "bold",
    fontSize: 35,
    textAlign: "center",
    color: "#6BD845",
  },
  countdownTimerStyle: {
    alignSelf: "center",
  },
  LoadingContainer: {
    flexDirection: "row",
    flex: 1,
    padding: 15,
    justifyContent: "center",
  },
  LoadingStyle: {
    fontWeight: "bold",
    fontSize: 25,
    alignSelf: "center",
    fontStyle: "italic",
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
