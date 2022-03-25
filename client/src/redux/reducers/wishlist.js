import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST, EMPTY_WISHLIST, START_LOADING_WISHLIST, END_LOADING_WISHLIST, FETCH_WISHLIST  } from "../constants/actionTypes";
import { loadData, saveData } from "../../utils/localStorage";

const wishlist =  loadData("Wishlist") || [];

const initWishlist = {
    wishlist: wishlist,
    isLoadingWishlist: false
};

const wishlistReducer = ( state=initWishlist, action ) => {
    switch ( action.type ){
        case START_LOADING_WISHLIST: {
            return { ...state, isLoadingWishlist: true };
        }
        case END_LOADING_WISHLIST: {
            return { ...state, isLoadingWishlist: false };
        }
        case FETCH_WISHLIST: {
            saveData("Wishlist", action.payload.wishlist);
            return {
                ...state,
                wishlist: action.payload.wishlist
            }
        }
        case ADD_TO_WISHLIST: {
            for ( const item of state.wishlist ){
                if ( item._id === action.course._id ) return;
            }
            const updatedWishlist = [...state.wishlist, action.course ];
            saveData("Wishlist", updatedWishlist);
            return {
                ...state,
                wishlist: updatedWishlist
            }
        }
        case REMOVE_FROM_WISHLIST: {
            const updatedWishlist = state.wishlist.filter( prod => (
                action.id !== prod._id 
            ));
            saveData("Wishlist", updatedWishlist);
            return {
                ...state,
                wishlist: updatedWishlist
            }
        }
        case EMPTY_WISHLIST: {
            saveData("Wishlist", []);
            return {
                ...state,
                wishlist: [],
            }
        }
        default: {
            return state;
        }
    }
};

export default wishlistReducer;