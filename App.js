import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import StartScreen from "./src/screens/StartScreen";
import QuestionScreen from "./src/screens/QuestionScreen";

const navigator = createStackNavigator(
  {
    Start: StartScreen,
    Question: QuestionScreen,
  },
  {
    initialRouteName: "Start",
    defaultNavigationOptions: {
      title: "Quizex",
    }
  }
);

export default createAppContainer(navigator);
