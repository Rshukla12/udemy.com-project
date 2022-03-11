import { AUTH } from '../constants/actionTypes';
import * as api from '../../api/index.js';
import { loginUpdate } from './cart';
import { loginUpdateWishlist } from './wishlist';
import { fetchPurchased } from './purchase';

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch(loginUpdate());
    dispatch(loginUpdateWishlist());
    dispatch(fetchPurchased());

    dispatch({ type: AUTH, data });

    router.push('/');
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    router.push('/');
  } catch (error) {
    console.log(error);
  }
};
