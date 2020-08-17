import axios from 'axios';
import  { Alert } from 'react-native';

export const get = (url, params, dispatch, start, success, faild) => {

  dispatch({ type: start })

  axios({
    method:'get',
    url,
  }).then((response) => {
    dispatch({ type: success, payload:response.data })
  }).catch((err) => {
    Alert.alert('UYARI', 'İstek sırasında bir sorun oluştu!')
    dispatch({ type: failed })
  })
}
