import { END_LOADING_REVIEW, FETCH_REVIEWS, START_LOADING_REVIEW } from "../constants/actionTypes";
import * as api from "../../api/index.js";

export const fetchReviewsByUser = () => async (dispatch) => {
    try {
        dispatch({type: START_LOADING_REVIEW});
        let result;
        if (localStorage.getItem('profile')) {
            result = await api.fetchReviews();
            dispatch({type: FETCH_REVIEWS, payload: {
                reviews: result.data.reviews
            }});
        }
    } catch (error) {
        console.log(error);
    }
    dispatch({type: END_LOADING_REVIEW});
};