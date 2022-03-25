import { INSTRUCTORAUTH } from '../constants/actionTypes';
import * as api from '../../api/index.js';

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signInByInstructor(formData);
    dispatch({ type: INSTRUCTORAUTH, data });

    router.push('/');
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUpByInstructor(formData);

    dispatch({ type: INSTRUCTORAUTH, data });

    router.push('/');
  } catch (error) {
    console.log(error);
  }
};
