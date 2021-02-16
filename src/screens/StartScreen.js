import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import useResults from "../hooks/useResults";
import { EvilIcons } from "@expo/vector-icons";

const StartScreen = ({ navigation }) => {
  const [
    getQuestions,
    questions,
    errorMessage,
    category,
    responseCode,
  ] = useResults();
  const [amount, setAmount] = useState("1");
  const [categoryId, setCategoryId] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [type, setType] = useState("");

  if (!category.length) {
    return null;
  }
  // console.log(category);
  return (
    <View style={styles.container}>
      {/* <TextInput
        style={styles.inputStyle}
        keyboardType="numeric"
        placeholder="Number of Questions"
        numeric
        value={Amount}
        onChangeText={setAmount}
        onEndEditing={() => getAmount(Amount)}
      /> */}
      <Text style={styles.titleStyle}>Select number of questions</Text>
      <DropDownPicker
        items={[
          { label: "10", value: "1" },
          { label: "20", value: "2" },
          { label: "30", value: "3" },
          { label: "40", value: "4" },
          { label: "50", value: "5" },
          { label: "1", value: "11" },
        ]}
        defaultValue="11"
        containerStyle={{ height: 50 }}
        labelStyle={{fontSize: 16, color: '#0082FF'}}
        onChangeItem={(item) => setAmount(item.label)}

      />
      <Text style={styles.titleStyle}>Select category</Text>
      <DropDownPicker
        items={category}
        defaultValue= {-1}
        containerStyle={{ height: 50 }}
        labelStyle={{fontSize: 16, color: '#0082FF'}}
        onChangeItem={(item) => setCategoryId(item.value)}
      />
      <Text style={styles.titleStyle}>Select difficulty</Text>
      <DropDownPicker
        items={[
          { label: "Any", value: "any" },
          { label: "Easy", value: "easy" },
          { label: "Medium", value: "medium" },
          { label: "Hard", value: "hard" },
        ]}
        defaultValue="any"
        containerStyle={{ height: 50 }}
        labelStyle={{fontSize: 16, color: '#0082FF'}}
        placeholder="Select Difficulty"
        onChangeItem={(item) => setDifficulty(item.value)}
      />
      <Text style={styles.titleStyle}>Select type</Text>
      <DropDownPicker
        items={[
          { label: "Any", value: "any" },
          { label: "Multiple Choice", value: "multiple" },
          { label: "True/False", value: "boolean" },
        ]}
        defaultValue="any"
        containerStyle={{ height: 50 }}
        labelStyle={{fontSize: 16, color: '#0082FF'}}
        placeholder="Select Type"
        onChangeItem={(item) => setType(item.value)}
      />
      <View>
        <TouchableOpacity
          onPress={() => {
       //     getQuestions(amount, categoryId, difficulty, type);
            // !responseCode == 1 ? (
              navigation.navigate("Question", {
                amount:amount,
                categoryId:categoryId,
                difficulty:difficulty,
                type:type 
              })
            // ) : (
              // <Text>Questions unavailable with these selection.</Text>
            // );
            // console.log(responseCode);
          }}
        >
          <Text style={styles.Button}>Start Quiz</Text>
        </TouchableOpacity>
      </View>
      {errorMessage ? <Text>{errorMessage}</Text> : null}
    </View>
  );
};

StartScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate("ScoreBoard")}>
        <EvilIcons name="trophy" size={45} />
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  pickerStyle: {
    marginVertical: 10,
    flex: 1,
    marginHorizontal: 15,
    padding: 25,
    borderColor: "black",
    backgroundColor: "#E3E1E1",
  },
  container: {
    padding: 10,
  },
  titleStyle: {
    fontSize: 15,
    marginVertical: 10,
    alignSelf: "center",
    fontWeight: "bold",
  },
  Button: {
    marginVertical: 100,
    alignSelf: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default StartScreen;
