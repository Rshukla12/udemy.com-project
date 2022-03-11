import { combineReducers } from 'redux';

import posts from './posts';
import auth from './auth';
import cart from "./cart";
import wishlist from "./wishlist";
import purchased from "./purchase";

export const reducers = combineReducers({ posts, auth, cart, wishlist, purchased });
