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

const StartScreen = ({ navigation }) => {
  const [
    getAmount,
    amount,
    errorMessage,
    category,
  ] = useResults();
  const [Amount, setAmount] = useState("");
  // const mapCategory = (categories) => {
  //   categories = categories.map((category) => {
  //     return { label: category.name, value: category.id };
  //   });
  // };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputStyle}
        keyboardType="numeric"
        placeholder="Number of Questions"
        numeric
        value={Amount}
        onChangeText={setAmount}
        onEndEditing={() => getAmount(Amount)}
      />
      <DropDownPicker
        items={[{ label: "categoryName", value: "categoryId" }]}
        defaultIndex={0}
        containerStyle={{ height: 50 }}
        placeholder="Select Category"
        onChangeItem={(item) => console.log(item.label, item.value)}
      />
      <DropDownPicker
        items={[{ label: "Item 1", value: "item1" }]}
        defaultIndex={0}
        containerStyle={{ height: 50 }}
        placeholder="Select Difficulty"
        onChangeItem={(item) => console.log(item.label, item.value)}
      />
      <DropDownPicker
        items={[
          { label: "Item 1", value: "item1" },
          { label: "Item 2", value: "item2" },
        ]}
        defaultIndex={0}
        containerStyle={{ height: 50 }}
        placeholder="Select Type"
        onChangeItem={(item) => console.log(item.label, item.value)}
      />
      <View>
        <TouchableOpacity onPress={() => navigation.navigate("Question")}>
          <Text style={styles.Button}>Start Quiz</Text>
        </TouchableOpacity>
      </View>
      {errorMessage ? <Text>{errorMessage}</Text> : null}
    </View>
  );
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
  inputStyle: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    marginHorizontal: 15,
    marginVertical: 10,
    padding: 10,
  },
  Button: {
    marginVertical: 100,
    alignSelf: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default StartScreen;
