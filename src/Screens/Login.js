import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
} from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import { login } from '../actions';
import CustomButton from '../Components/CustomButton';
import AsyncStorage from '@react-native-community/async-storage';
import { LOCAL_AUTH_ID, USER } from '../actions/types';
import * as RootNavigation from '../RootNavigation';

const { width, height } = Dimensions.get('window');

function Login (props) {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(LOCAL_AUTH_ID).then((token) =>{
      if(token) {
        USER.token = token
        RootNavigation.replace('Home')
      } else {
        setLoading(false)
      }
    })
  }, [])

  return(
    <SafeAreaView style={styles.containerView}>
        <TextInput
          style={styles.input}
          placeholder='e-mail'
          placeholderTextColor = 'grey'
          value={email}
          onChangeText={(value) => setEmail(value)}
        />

        <TextInput
          style={styles.input}
          placeholder='password'
          value={password}
          onChangeText={(value) => setPassword(value)}
          secureTextEntry
        />

        <CustomButton
          buttonStyle={styles.customButton}
          textStyle={styles.buttonText}
          text='Sign In'
          loading={props.loading}
          buttonPress={() => {
            const params = {
              email: email.toLowerCase(),
              password
            }
            props.login(params)
          }}
        />

        <CustomButton
          textStyle={styles.registerText}
          text='Register'
          buttonPress={()=>{
            props.navigation.navigate('Register')
          }}
        />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerView:{
    flex:1,
    alignItems:'center',
    backgroundColor:'#202329',
  },
  customButton:{
    alignItems:'center',
    justifyContent:'center',
    borderWidth: 0.5,
    borderRadius:4,
    marginBottom: height * 0.01,
    marginTop: height * 0.01,
    width: width * 0.84,
    height: height * 0.07,
    backgroundColor:'#E50914',
  },
  buttonText:{
    color:'white',
    fontSize:20,
    fontWeight:'300',
    textAlign:'center',
  },
  registerText:{
    color:'white',
    fontSize:16,
    fontWeight:'300',
    textAlign:'center',
  },
  input:{
    color:'black',
    paddingLeft:width * 0.04,
    borderWidth: 0.5,
    borderRadius:4,
    backgroundColor:'white',
    marginBottom: height * 0.01,
    marginTop: height * 0.01,
    width: width * 0.84,
    height: height * 0.07,
  },
});

const mapStateToProps = ({ authResponse }) => {
    const { loading, user } = authResponse;
    return { loading, user };
};

export default connect(mapStateToProps, { login })(Login);
