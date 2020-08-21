import {
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
} from '../actions/types';

const INITIAL_STATE = {
  loadingList: false,
  loadingCharacterDetail:false,
  loadingAddCharacter: false,
  loadingRemoveCharacter: false,
  list: [],
  character: [],
};

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

    case CHARACTER_DETAIL_START:
    case LIST_START:
      return {
        ...state,
        loadingList: true,
      };

    case CHARACTER_DETAIL_SUCCESS:
    return {
      ...state,
      loadingList: false,
      character: action.payload
    };

    case LIST_SUCCESS:
      return {
        ...state,
        loadingList: false,
        list: action.payload
      };

    case CHARACTER_DETAIL_FAILED:
    case LIST_FAILED:
      return {
        ...state,
        loadingList: false,
      };

    default:
      return state;

  }
}
