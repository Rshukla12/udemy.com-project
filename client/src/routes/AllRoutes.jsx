import React from 'react';
import {Switch, Route, Redirect } from 'react-router-dom';
import Home from '../../src/components/Home/Home';
import Auth from '../../src/components/Auth/Auth';

import PostDetails from '../../src/components/PostDetails/PostDetails';
import CreatorOrTag from '../../src/components/CreatorOrTag/CreatorOrTag';


const AllRoutes = () =>{
    const user = JSON.parse(localStorage.getItem('profile'));

    return(
        <Switch>
        <Route path="/" exact component={() => <Redirect to="/posts" />} />
        <Route path="/posts" exact component={Home} />
        <Route path="/posts/search" exact component={Home} />
        <Route path="/posts/:id" exact component={PostDetails} />
        {/* <Route path={['/creators/:name', '/tags/:name']} component={CreatorOrTag} /> */}
        <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/posts" />)} />
      </Switch>
    )
}
export default AllRoutes;