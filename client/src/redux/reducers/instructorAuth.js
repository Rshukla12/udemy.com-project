import { loadData, saveData } from '../../utils/localStorage';
import * as actionType from '../constants/actionTypes';

const isLogin = loadData("isLogin");

const authReducerIns = (state = { authData: null, isLogin}, action) => {
  switch (action.type) {
    case actionType.INSTRUCTORAUTH:
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
      saveData('isLogin', true)
      
      return { ...state, authDataIns: action.data, isLogin: true, loading: false, errors: null };
    case actionType.LOGOUT:
      localStorage.clear();

      return { ...state, authDataIns: null, isLogin: false, loading: false, errors: null };
    default:
      return state;
  }
};

export default authReducerIns;
