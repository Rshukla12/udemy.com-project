import { EMPTY_PURCHASED, END_LOADING_PURCHASED, FETCH_PURCHASED, START_LOADING_PURCHASED } from "../constants/actionTypes";
import * as api from "../../api/index.js";

export const fetchPurchased = () => async (dispatch) => {
    try {
        dispatch({type: START_LOADING_PURCHASED});
        let result;
        if (localStorage.getItem('profile')) {
            result = await api.fetchPurchased();
            console.log(result.data.purchased);
            dispatch({type: FETCH_PURCHASED, payload: {
                purchased: result.data.purchased
            }});
        }
    } catch (error) {
        console.log(error);
    }
    dispatch({type: END_LOADING_PURCHASED});
};

export const emptyPurchased = (course) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING_PURCHASED});
        if (localStorage.getItem('profile')) {
            const { data } = await api.emptyWishlist() ;
        }
        dispatch({type: EMPTY_PURCHASED});
        
    } catch (error) {
        console.log(error);
    }
    dispatch({type: END_LOADING_PURCHASED});
}