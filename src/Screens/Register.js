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
import { register } from '../actions';
import CustomButton from '../Components/CustomButton';

const { width, height } = Dimensions.get('window');

function Register (props) {

  const [firstName, setFirstname] = useState()
  const [lastName, setLastname] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  return(
    <SafeAreaView style={styles.containerView}>

      <TextInput
        style={styles.input}
        placeholder='firstname'
        value={firstName}
        onChangeText={(value) => setFirstname(value)}
      />

      <TextInput
        style={styles.input}
        placeholder='lastname'
        value={lastName}
        onChangeText={(value) => setLastname(value)}
      />

      <TextInput
        style={styles.input}
        placeholder='email'
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
        text='Register'
        loading={props.loading}
        buttonPress={() => {
          const params = {
            email,
            password,
            firstName,
            lastName
          }
          props.register(params)
        }}
      />

      <CustomButton
      textStyle={styles.registerText}
      text='Sign In'
      buttonPress={()=>{
        props.navigation.pop()
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
    const { loading } = authResponse;
    return { loading };
};

export default connect(mapStateToProps, { register })(Register);
