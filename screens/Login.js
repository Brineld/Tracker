import React, { Component } from 'react'
// import { AsyncStorage } from 'react-native'
import { ActivityIndicator, Keyboard, KeyboardAvoidingView, StyleSheet } from 'react-native'

import { Button, Block, Input, Text } from '../components';
import { theme } from '../constants';
import Axios from 'axios';

const VALID_EMAIL = "contact@react-ui-kit.com";
const VALID_PASSWORD = "subscribe";

export default class Login extends Component {
constructor(props){
  super(props);
  state = {
    email:"",
    password: "",
   
    // errors: [],
    
  }
}
componentDidMount(){
  this.setState({ loading: true });

  // this._loadInitialState().done();
}
// _loadInitialState= async()=>{
//   var value= await AsyncStorage.getItem('user');
//   if(value!=null)
//   {
//     this.props.navigation.navigate('Browse');
//   }

  handleLogin=()=> {
    const { navigation } = this.props;
    const { email, password } = this.state;
    


    Keyboard.dismiss();
    //alert(email);

    Axios.post(`http://192.168.43.141:3001/verifyuser`,{email,password})
    .then(res=>{
      if(res.data.success===true){
        // async()=>{
        //  await AsyncStorage.setItem('user',res.data.user);
        // }
        navigation.navigate('MonthList');
      }
      else{
       alert(res.data.message);
      }
    })
    .catch((error) => {
      console.error(error);     });
    
    

//     fetch(`https://172.24.3.159:3001/verifyuser`, {
//     method: 'POST',
//     headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     email:this.state.email,
//     pass:this.state.password,
//   }),
// })
// .then((response) => response.json())
// .then((res) => {
//       if(res.success===true){
//         //AsyncStorage.setItem('user',res.user);
//         navigation.navigate('Browse');
//       }
//       else{
//         alert('res.message');
//       }
//     })
//     

    

    // check with backend API or with some static data
  //   if (email !== VALID_EMAIL) {
  //     errors.push('email');
  //   }
  //   if (password !== VALID_PASSWORD) {
  //     errors.push('password');
  //   }

  //   this.setState({ errors, loading: false });

  //   if (!errors.length) {
  //     navigation.navigate("Browse");
  //   }
   }

  render() {
    const { navigation } = this.props;
    // const { errors } = this.state;
    // const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;

    return (
      <KeyboardAvoidingView style={styles.login} behavior="padding">
        <Block padding={[0, theme.sizes.base * 2]}>
          <Text h1 bold center>Login</Text>
          <Block middle>
            <Input
              label="Email"
             
              // error={hasErrors('email')}
              style={[styles.input ]}
              // defaultValue={this.state.email}
              onChangeText={text => this.setState({ email: text })}
            />
            <Input
              secure
            
              label="Password"
              // error={hasErrors('password')}
              style={[styles.input]}
              // defaultValue={this.state.password}
              onChangeText={text => this.setState({ password: text })}
            />
            <Button gradient onPress={() => this.handleLogin()}>
            <Text bold white center>Login</Text>
              
            </Button>

            <Button onPress={() => navigation.navigate('Forgot')}>
              <Text gray caption center style={{ textDecorationLine: 'underline' }}>
                Forgot your password?
              </Text>
            </Button>
          </Block>
        </Block>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  login: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  // hasErrors: {
  //   borderBottomColor: theme.colors.accent,
  // }
})

