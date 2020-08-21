import axios from 'axios';
import * as RootNavigation from '../RootNavigation';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { USER, LOCAL_AUTH_ID } from './types';

export const get = (url, params, dispatch, start, success, failed) => {

  const method = url.split('/').pop();
  dispatch({ type: start })

  axios({
    method: 'get',
    url,
    params:params,
    headers:{
      authorization: 'Bearer '.concat(USER.token)
    }
  }).then((response) => {
    dispatch({
      type: success,
      payload: method=='characters'
      ?
      response.data.characters
      :
      response.data.character
    })
  }).catch((err) => {
    Alert.alert('UYARI', 'İstek sırasında bir sorun oluştu!')
    dispatch({ type: failed })
  })
}

export const post = (url, params, dispatch, start, success, failed) => {

  const method = url.split('/').pop();
  dispatch({  type: start })

  axios({
    method: 'post',
    url,
    data: params,
    headers: {
      authorization: 'Bearer '.concat(USER.token)
    }
  }).then((response) => {
    dispatch({
      type: success,
      payload: method == 'removeCharacter'
      ?
      params.id
      :
      response.data
    })
    if(method == 'login' || method == 'register'){
      RootNavigation.replace('Home')
      USER.token = response.data.token
      AsyncStorage.setItem(LOCAL_AUTH_ID, response.data.token)
    } else if(method == 'addCharacter'){
      RootNavigation.pop()
    }
  }).catch((err) => {
    console.log(err)
    // Alert.alert('UYARI', err.data.message)
    dispatch({ type: failed })
  })
}
