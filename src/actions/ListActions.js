import {
  BASEURL,
  LIST_START,
  LIST_SUCCESS,
  LIST_FAILED,
  CHARACTER_DETAIL_START,
  CHARACTER_DETAIL_SUCCESS,
  CHARACTER_DETAIL_FAILED,
  ADD_CHARACTER_START,
  ADD_CHARACTER_SUCCESS,
  ADD_CHARACTER_FAILED,
  REMOVE_CHARACTER_START,
  REMOVE_CHARACTER_SUCCESS,
  REMOVE_CHARACTER_FAILED,
} from './types';

import { get, post } from './api'

export const getList = (params) => {
  return (dispatch) => {
    get(
      BASEURL.concat('/api/characters'),
      params ? params : {},
      dispatch,
      LIST_START,
      LIST_SUCCESS,
      LIST_FAILED,
    )
  }
}

export const getDetail = (params) => {
  return (dispatch) => {
    get(
      BASEURL.concat('/api/characterById'),
      params,
      dispatch,
      CHARACTER_DETAIL_START,
      CHARACTER_DETAIL_SUCCESS,
      CHARACTER_DETAIL_FAILED,
    )
  }
}


export const addCharacter = (params) => {
  return (dispatch) => {
    post(
      BASEURL.concat('/api/addCharacter'),
      params,
      dispatch,
      ADD_CHARACTER_START,
      ADD_CHARACTER_SUCCESS,
      ADD_CHARACTER_FAILED,
    )
  }
}


export const removeCharacter = (params) => {
  return (dispatch) => {
    post(
      BASEURL.concat('/api/removeCharacter'),
      params,
      dispatch,
      REMOVE_CHARACTER_START,
      REMOVE_CHARACTER_SUCCESS,
      REMOVE_CHARACTER_FAILED,
    )
  }
}
