import { ADD_TO_CART, EMPTY_CART, END_LOADING_CART, FETCH_CART, REMOVE_FROM_CART, START_LOADING_CART } from "../constants/actionTypes";
import * as api from "../../api/index.js";
import { loadData } from "../../utils/localStorage";

export const fetchCart = () => async (dispatch) => {
    try {
        dispatch({type: START_LOADING_CART});
        let result;
        if (localStorage.getItem('profile')) {
            result = await api.fetchCart();
            dispatch({type: FETCH_CART, payload: {
                cart: result.data.cart,
                total: result.data.total
            }});
        }
    } catch (error) {
        console.log(error);
    }
    dispatch({type: END_LOADING_CART});
};

export const loginUpdate = () => async (dispatch) => {
    try {
        dispatch({type: START_LOADING_CART});
        const cart = loadData("Cart");
        const { data } = api.addMulToCart( cart.map(el=>el._id) );
        dispatch({ type: FETCH_CART, data });

    } catch (error) {
        console.log(error);
    }
    dispatch({type: END_LOADING_CART});
};

export const addToCart = (course) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING_CART});
        if (localStorage.getItem('profile')) {
            const { data } = await api.addToCart(course._id) ;
            // dispatch({type: FETCH_CART, payload: {
            //     cart: data.cart,
            //     total: data.total
            // }});
        }
        dispatch({type: ADD_TO_CART, course});
    } catch (error) {
        console.log(error);
    }
    dispatch({type: END_LOADING_CART});
}


export const removeFromCart = (id) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING_CART});
        if (localStorage.getItem('profile')) {
            const { data } = await api.removeFromCart(id) ;
        } 
        dispatch({type: REMOVE_FROM_CART, id: id});
        
    } catch (error) {
        console.log(error);
    }
    dispatch({type: END_LOADING_CART});
}


export const emptyCart = (course) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING_CART});
        if (localStorage.getItem('profile')) {
            const { data } = await api.emptyCart() ;
        }
        dispatch({type: EMPTY_CART});
        
    } catch (error) {
        console.log(error);
    }
    dispatch({type: END_LOADING_CART});
}