import React, { Component } from 'react';
import { Alert, ActivityIndicator, Keyboard, KeyboardAvoidingView, StyleSheet } from 'react-native';

import { Button, Block, Input, Text } from '../components';
import { theme } from '../constants';
import Axios from 'axios';

export default class SignUp extends Component {
  state = {
    email: null,
    username: null,
    password: null,
    // errors: [],
    // loading: false,
  }

  componentDidMount(){
    this.setState({ loading: true });
  }

  handleSignUp() {
    const { navigation } = this.props;
    const { email, username, password } = this.state;
    //const errors = [];

    Keyboard.dismiss();
   

    Axios.post(`http://192.168.43.141:3001/user`,{email,username,password})
    .then(res=>{
      if(res.data.success===true){
        //AsyncStorage.setItem('user',res.user);
        navigation.navigate('Login');
        Alert.alert(
          'Success!',
          'Your account has been created',
          [
            {
              text: 'Continue', onPress: () => {
                navigation.navigate('Login')
              }
            }
          ],
          { cancelable: false }
        )

      }
     
    })
    .catch((error) => {
      console.error(error);     });

    // check with backend API or with some static data
  //   if (!email) errors.push('email');
  //   if (!username) errors.push('username');
  //   if (!password) errors.push('password');

   

  //   if (!errors.length) {
     
  //   }
   }

  render() {
    const { navigation } = this.props;
   // const { loading, errors } = this.state;
    // const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;

    return (
      <KeyboardAvoidingView style={styles.signup} behavior="padding">
        <Block padding={[0, theme.sizes.base * 2]}>
          <Text h1 bold>Sign Up</Text>
          <Block middle>
            <Input
              email
              label="Email"
              // error={hasErrors('email')}
              style={[styles.input, ]}
              defaultValue={this.state.email}
              onChangeText={text => this.setState({ email: text })}
            />
            <Input
              label="Username"
              // error={hasErrors('username')}
              style={[styles.input ]}
              //defaultValue={this.state.username}
              onChangeText={text => this.setState({ username: text })}
            />
            <Input
              secure
              label="Password"
              // error={hasErrors('password')}
              style={[styles.input ]}
              //defaultValue={this.state.password}
              onChangeText={text => this.setState({ password: text })}
            />
            <Button gradient onPress={() => this.handleSignUp()}>
            <Text bold white center>Sign Up</Text>
              
            </Button>

            <Button onPress={() => navigation.navigate('Login')}>
              <Text gray caption center style={{ textDecorationLine: 'underline' }}>
                Back to Login
              </Text>
            </Button>
          </Block>
        </Block>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  signup: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent,
  }
})

