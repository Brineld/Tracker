import React from "react";
import { StyleSheet, StatusBar } from "react-native";
import { Provider } from "react-redux";
import { TabNavigator, SafeAreaView } from "react-navigation";
import store from "./store";
import MonthList from "./screens/MonthList";
import Month from "./screens/Month";
import Form from "./screens/Form";
import Welcome from "./screens/Welcome";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Forgot from "./screens/Forgot"

export default class App extends React.PureComponent {
  render() {
    const MainNavigator = TabNavigator(
      {
        Welcome:{screen: Welcome},
        Login:{screen: Login},
        Signup:{screen: Signup},
        Forgot:{screen: Forgot},
        MonthList: { screen: MonthList },
        form: { screen: Form },
        month: { screen: Month }
      },
      {
        navigationOptions: {
          tabBarVisible: false
        },
        swipeEnabled: false,
        tabBarPosition: "bottom",
        lazy: true
      }
    );
    return (
      <Provider store={store}>
        <SafeAreaView style={styles.container}>
          <MainNavigator />
        </SafeAreaView>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight : 0
  }
});
