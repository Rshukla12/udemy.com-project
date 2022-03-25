import { END_LOADING_REVIEW, FETCH_REVIEWS, START_LOADING_REVIEW } from "../constants/actionTypes";
import * as api from "../../api/index.js";

export const fetchReviewsByUser = () => async (dispatch) => {
    try {
        dispatch({type: START_LOADING_REVIEW});
        let result;
        console.log(localStorage.getItem('profile')?.result?._id, localStorage.getItem('profile')?.result)
        if (localStorage.getItem('profile')) {
            result = await api.fetchReviews(JSON.parse(localStorage.getItem('profile'))?.result?._id)
            dispatch({type: FETCH_REVIEWS, payload: {
                reviews: result.data.data
            }});
        }
    } catch (error) {
        console.log(error);
    }
    dispatch({type: END_LOADING_REVIEW});
};