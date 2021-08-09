import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';

const ProtectedRoute = ({ component: Component, ...props }) => {

  const currentUser = React.useContext(CurrentUserContext);
  return (
    <Route>
      {
        () => currentUser.isLoggedIn ? <Component {...props} /> : <Redirect to="/main"/>
      }
    </Route>
  );
};

export default ProtectedRoute;