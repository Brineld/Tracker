import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { View, StyleSheet } from "react-native";
import { Text } from '../components';
import { Icon } from "react-native-elements";
import PropTypes from "prop-types";
import uuid from "uuid/v1";
import { addNewLineinMonthBudget } from "../actions/monthActions";
import BackBtn from "../components/BackBtn";
import Switch from "../components/Switch";
import FormInput from "../components/FormInput";

class Form extends PureComponent {
  state = {
    text: "",
    $: "",
    or: true,
    warning: ""
  };

  onButtonPress = () => {
    if (!this.state.text || !this.state.$) {
      return this.setState({ warning: "Both fields are required!" });
    }
    const payload = {
      id: uuid(),
      text: this.state.text,
      $: this.state.$,
      or: this.state.or
    };
    const id = this.props.navigation.state.params.item.id;
    this.props.addNewLineinMonthBudget(id, payload);
    this.setState({
      text: "",
      $: ""
    });
  };

  change = () => {
    this.setState({ or: !this.state.or });
  };

  isNumber = $ => {
    if (isNaN($)) {
      return this.setState({ warning: "This input accepts only numbers!" });
    }
    this.setState({
      $
    });
  };

  back = () => {
    const { item } = this.props.navigation.state.params;
    this.props.navigation.navigate("month", { item });
  };

  render() {
    return (
      <View style={styles.container}>
        <FormInput
          placeholder="Income/Expense Category"
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
        />
        <Text center h3 gray2 style={{ marginBottom: 10}}>
            Eg.Travel,Food,Shopping,Entertainment
          </Text>
        <FormInput
          placeholder={this.state.warning || "Enter Amount"}
          onChangeText={this.isNumber}
          value={this.state.$}
        />

        <View style={styles.buttonsRow}>
          <Switch change={this.change} or={this.state.or} />
          <Icon
            size={30}
            containerStyle={styles.iconSwitch}
            name="check"
            type="font-awesome"
            color="#fff"
            onPress={this.onButtonPress}
          />
          <BackBtn style={{ marginLeft: 10 }} back={this.back} />
        </View>
      </View>
    );
  }
}

Form.propTypes = {
  navigation: PropTypes.object,
  addNewLineinMonthBudget: PropTypes.func
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    paddingTop: 20
  },
  iconSwitch: {
    borderRadius: 50,
    height: 80,
    width: 80,
    backgroundColor: "#ff6666"
  },
  buttonsRow: {
    flexDirection: "row"
  }
});

export default connect(
  null,
  { addNewLineinMonthBudget }
)(Form);
