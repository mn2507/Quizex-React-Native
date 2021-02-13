import React from "react";
import { View, Text, StyleSheet } from "react-native";
import useResults from "../hooks/useResults";

const QuestionScreen = () => {
  const [
    getQuestions,
    questions,
    errorMessage,
    category,
    responseCode,
  ] = useResults();
  return (
    <View>
      <Text>{questions}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default QuestionScreen;
