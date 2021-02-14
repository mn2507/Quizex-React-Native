import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import useResults from "../hooks/useResults";
import { AntDesign } from "@expo/vector-icons";
import CountdownCircle from 'react-native-countdown-circle';

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
    setQuestions(questions);
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
      NextQuestion(result);
    });
  }, []);

  if (!questions.length) {
    return (
      <View>
        <Text>Loading questions...</Text>
      </View>
    );
  } else {
    return ( 
      <View>
        <Text>{individualQuestion}</Text>
        {individualAnswer.map((item, index) => (
          <Button
            title={item}
            key={index}
            onPress={() => {

               console.log(counter + " " + TOTAL_QUESTIONS);
              if(counter == TOTAL_QUESTIONS){
                console.log("Entering")
                setFinalScore("Completed: " +answeredCorrect + "/" + TOTAL_QUESTIONS)
                return
              }
           


                if (correctAnswer === item) {
                  setAnsweredCorrect(answeredCorrect + 1);
                  setMessage("You have answered correctly");
                }
                else{
                  setMessage("You have answered incorrectly");
                }

                setTimeout  (() => {
                  setMessage("");
                  NextQuestion(questions);
                },1000);

           

              // setAnsweredCorrect([counter]["answered"] = "correct");
              // console.log("Chosen Answer", item);
              // console.log("answercorrect: " + answeredCorrect);

          
            }}
          ></Button>
        ))}
        <Text>{message}</Text>
        <Text>
          {counter}/{TOTAL_QUESTIONS}
        </Text>
        <Text>{finalScore}</Text>
        <CountdownCircle
                seconds={10}
                radius={40}
                style={styles.itemStyle}
                borderWidth={10}
                color="#ff003f"
                bgColor="#ffffff"
                useNativeDriver = "false"
                textStyle={{ fontSize: 20 }}
                
            />
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
