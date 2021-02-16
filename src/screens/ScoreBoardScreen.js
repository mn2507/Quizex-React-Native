import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import DateTimeSetter from "../components/DateTimeSetter";
import pushResults from "../hooks/pushResults";

const ScoreBoardScreen = ({ navigation }) => {
  const [currentDate] = DateTimeSetter();
  // const CompletedTime = navigation.getParam("CompletedTime");
  // const finalScore = navigation.getParam("finalScore");
  const [AddResultsToDb, dbResults] = pushResults();

  //   const GetResultsFromDb = ()

  return (
    <View>
      {/* <Text>Current Date and Time: {CompletedTime}</Text> */}
      <FlatList
        data={dbResults}
        keyExtractor={(result) => result.completedTime}
        renderItem={({ item }) => {
          // console.log("item: " + item)
          return (
            <Text>
              Started Time: {item.completedTime} Overall Score: {item.finalScore}
            </Text>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default ScoreBoardScreen;
