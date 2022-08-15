import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import {useSelector} from "react-redux";


const PrivateRoute =  ({component: Component, ...rest}) => {
    const userinfo =  useSelector((state)=>state.users.isLogg);
    return (
        <Route {...rest} render={props => (
            
            userinfo ?
             <Component  {...props} />
            :<Redirect to="/loggin" />

        )} />
      );
};

export default PrivateRoute;


