import { ADD_TO_WISHLIST, EMPTY_WISHLIST, END_LOADING_WISHLIST, FETCH_WISHLIST, REMOVE_FROM_WISHLIST, START_LOADING_WISHLIST } from "../constants/actionTypes";
import * as api from "../../api/index.js";
import { loadData } from "../../utils/localStorage";

export const fetchWishlist = () => async (dispatch) => {
    try {
        dispatch({type: START_LOADING_WISHLIST});
        let result;
        if (localStorage.getItem('profile')) {
            result = await api.fetchWishlist();
            dispatch({type: FETCH_WISHLIST, payload: {
                wishlist: result.data.wishlist
            }});
        }
    } catch (error) {
        console.log(error);
    }
    dispatch({type: END_LOADING_WISHLIST});
};

export const loginUpdateWishlist = () => async (dispatch) => {
    try {
        dispatch({type: START_LOADING_WISHLIST});
        const wishlist = loadData("wishlist");
        const { data } = api.addMulToWishlist( wishlist.map(el=>el._id) );
        dispatch({ type: FETCH_WISHLIST, data });

    } catch (error) {
        console.log(error);
    }
    dispatch({type: END_LOADING_WISHLIST});
};

export const addToWishlist = (course) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING_WISHLIST});
        if (localStorage.getItem('profile')) {
            const { data } = await api.addToWishlist(course._id) ;
            // dispatch({type: FETCH_WISHLIST, payload: {
            //     wishlist: data.wishlist,
            //     total: data.total
            // }});
        }
        dispatch({type: ADD_TO_WISHLIST, course});
    } catch (error) {
        console.log(error);
    }
    dispatch({type: END_LOADING_WISHLIST});
}


export const removeFromWishlist = (id) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING_WISHLIST});
        if (localStorage.getItem('profile')) {
            const { data } = await api.removeFromWishlist(id) ;
        } 
        dispatch({type: REMOVE_FROM_WISHLIST, id: id});
        
    } catch (error) {
        console.log(error);
    }
    dispatch({type: END_LOADING_WISHLIST});
}


export const emptyWishlist = (course) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING_WISHLIST});
        if (localStorage.getItem('profile')) {
            const { data } = await api.emptyWishlist() ;
        }
        dispatch({type: EMPTY_WISHLIST});
        
    } catch (error) {
        console.log(error);
    }
    dispatch({type: END_LOADING_WISHLIST});
}