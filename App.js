import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import StartScreen from "./src/screens/StartScreen";
import QuestionScreen from "./src/screens/QuestionScreen";
import ScoreBoardScreen from "./src/screens/ScoreBoardScreen";

const navigator = createStackNavigator(
  {
    Start: StartScreen,
    Question: QuestionScreen,
    ScoreBoard: ScoreBoardScreen,
  },
  {
    initialRouteName: "Start",
    defaultNavigationOptions: {
      title: "Quizex",
    }
  }
);

export default createAppContainer(navigator);
