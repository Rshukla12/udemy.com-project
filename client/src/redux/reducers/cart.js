import { ADD_TO_CART, REMOVE_FROM_CART, EMPTY_CART, FETCH_CART, START_LOADING_CART, END_LOADING_CART } from "../constants/actionTypes";
import { loadData, saveData } from "../../utils/localStorage";

const cart =  loadData("Cart") || [];

let total = 0;
cart.forEach( prod => {
    total += prod.price;
});


const initCart = {
    cart: cart,
    isLoading: false, 
    total: total
};

const cartReducer = ( state=initCart, action ) => {
    switch ( action.type ){
        case START_LOADING_CART: {
            return { ...state, isLoading: true };
        }
        case END_LOADING_CART: {
            return { ...state, isLoading: false };
        }
        case FETCH_CART: {
            saveData("Cart", action.payload.cart);
            return {
                ...state,
                cart: action.payload.cart,
                total: action.payload.total
            }
        }
        case ADD_TO_CART: {
            for ( const item of state.cart ){
                if ( item._id === action.course._id ) return;
            }
            const updatedCart = [...state.cart, action.course ];
            saveData("Cart", updatedCart);
            return {
                ...state,
                cart: updatedCart,
                total: state.total + action.course.price
            }
        }
        case REMOVE_FROM_CART: {
            let total = 0;
            const updatedCart = state.cart.filter( prod => {
                if ( action.id !== prod._id ) {
                    total += prod.price;
                    return true;
                } else return false;
            });

            saveData("Cart", updatedCart);
            return {
                ...state,
                cart: updatedCart,
                total: total
            }
        }
        case EMPTY_CART: {
            saveData("Cart", []);
            return {
                ...state,
                cart: [],
                total: 0
            }
        }
        default: {
            return state;
        }
    }
};

export default cartReducer;