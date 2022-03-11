import { EMPTY_PURCHASED, START_LOADING_PURCHASED, END_LOADING_PURCHASED, FETCH_PURCHASED  } from "../constants/actionTypes";

const initPurchased = {
    purchased: [],
    isLoadingPurchased: false
};

const purchasedReducer = ( state=initPurchased, action ) => {
    switch ( action.type ){
        case START_LOADING_PURCHASED: {
            return { 
                ...state, 
                isLoadingPurchased: true 
            };
        }
        case END_LOADING_PURCHASED: {
            return { 
                ...state, 
                isLoadingPurchased: false 
            };
        }
        case FETCH_PURCHASED: {
            return {
                ...state,
                purchased: action.payload.purchased
            }
        }
        case EMPTY_PURCHASED: {
            return {
                ...state,
                purchased: [],
            }
        }
        default: {
            return state;
        }
    }
};

export default purchasedReducer;