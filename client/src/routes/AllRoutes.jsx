import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../../src/components/Home/Home';
import HomePage from '../../src/pages/Home';
import Search from '../../src/pages/Search';
import Wishlist from '../../src/pages/Wishlist';
import Checkout from '../../src/pages/Checkout';
import Cart from '../../src/pages/Cart';
import Purchased from '../../src/pages/Purchased';
import Course from '../../src/pages/Course';
import Category from '../../src/pages/Category';
import Auth from '../../src/components/Auth/Auth';

import PostDetails from '../../src/components/PostDetails/PostDetails';
import CreatorOrTag from '../../src/components/CreatorOrTag/CreatorOrTag';
import SearchBar from '../components/Navbar2/SearchBar';


const AllRoutes = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/search" exact component={Home} />
      <Route path="/course" exact component={Home} />
      <Route path="/cart" exact component={Cart} />
      <Route path="/checkout" exact component={Checkout} />
      <Route path="/wishlist" exact component={Wishlist} />
      <Route path="/purchased" exact component={Purchased} />
      <Route path="/category" exact component={Category} />
      <Route path="/posts" exact component={Home} />
      <Route path="/posts/search" exact component={Home} />
      <Route path="/posts/:id" exact component={PostDetails} />
      <Route path={['/creators/:name', '/tags/:name']} component={CreatorOrTag} />
      <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/course" />)} />
    </Switch>
  )
}
export default AllRoutes;