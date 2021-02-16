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

  if (!dbResults.length) {
    return (
      <View style={styles.LoadingContainer}>
        <Text style={styles.LoadingStyle}>Loading Scoreboard...</Text>
      </View>
    );
  } else {
    return (
      <>
        <View style={styles.Header}>
          <Text style={styles.HeaderTextLeft}>Completed{"\n"}Date {"&"} Time</Text>
          <Text style={styles.HeaderTextRight}>Overall{"\n"}Score</Text>
        </View>
        <FlatList
          data={dbResults}
          keyExtractor={(result) => result.completedTime}
          renderItem={({ item }) => {
            // console.log("item: " + item)
            return (
              <View style={styles.ScoreResultsStyle}>
                <Text style={styles.CompletedTimeStyle}>{item.completedTime}</Text>
                <Text style={styles.FinalScoreStyle}>{item.finalScore}</Text>
              </View>
            );
          }}
        />
      </>
    );
  }
};

const styles = StyleSheet.create({
  LoadingContainer: {
    flexDirection: "row",
    flex:1,
    padding: 15,
    justifyContent: "center",
  },
  LoadingStyle: {
    fontWeight: "bold",
    fontSize: 25,
    alignSelf: "center",
    fontStyle: "italic",
  },
  Header: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  HeaderTextLeft: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0082FF",
  },
  HeaderTextRight: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "right",
    color: "#0082FF",
  },
  ScoreResultsStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderColor: "#CECECE",
  },
  FinalScoreStyle: {
    fontWeight: "bold",
    fontSize: 15
  },
  CompletedTimeStyle: {
    fontSize: 15
  }
});

export default ScoreBoardScreen;
