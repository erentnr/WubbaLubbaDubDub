import React from 'react';

import {
  Text,
  TouchableOpacity,
} from 'react-native';

function CustomButton(props){
  return(
    <TouchableOpacity
      onPress={props.buttonPress}
      style={props.buttonStyle}
    >
      <Text style={props.textStyle}>{props.text}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton;
