import * as React from 'react';
import { StackActions } from '@react-navigation/native';

export const navigationRef = React.createRef();

export const navigate = (name, params) => {
  navigationRef.current?.navigate(name, params);
}

export const replace = (...args) => {
  navigationRef.current?.dispatch(StackActions.replace(...args));
}

export const pop = () => {
  navigationRef.current?.dispatch(StackActions.pop());
}
