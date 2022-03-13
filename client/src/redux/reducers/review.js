import { EMPTY_REVIEWS, START_LOADING_REVIEW, END_LOADING_REVIEW, FETCH_REVIEWS  } from "../constants/actionTypes";

const initReviews = {
    reviews: [],
    isLoadingReview: false
};

const reviewReducer = ( state=initReviews, action ) => {
    switch ( action.type ){
        case START_LOADING_REVIEW: {
            return { 
                ...state, 
                isLoadingReview: true 
            };
        }
        case END_LOADING_REVIEW: {
            return { 
                ...state, 
                isLoadingReview: false 
            };
        }
        case FETCH_REVIEWS: {
            return {
                ...state,
                reviews: action.payload.reviews
            }
        }
        case EMPTY_REVIEWS: {
            return {
                ...state,
                reviews: [],
            }
        }
        default: {
            return state;
        }
    }
};

export default reviewReducer;