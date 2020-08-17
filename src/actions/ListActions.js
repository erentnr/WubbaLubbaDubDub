import {
  BASEURL,
  LIST_START,
  LIST_SUCCESS,
  LIST_FAILED,
} from './types';

import { get } from './api'

export const getList = (params) => {
  return (dispatch) => {
    get(
      BASEURL.concat('/character'),
      params ? params : {},
      dispatch,
      LIST_START,
      LIST_SUCCESS,
      LIST_FAILED,
    )
  }
}
