import React from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import SavedMovies from '../SavedMovies/SavedMovies';
import Movies from '../Movies/Movies';
import PageNotFound from '../PageNotFound/PageNotFound';

function App() {
  React.useEffect(() => {
    document.title = "Bitfilms"
  }, []);

  const user = {
    name: 'Владимир',
    email: 'pochta@yandex.ru'
  };
  // const isLoggedIn = true;
  const isLoggedIn = false;

  // eslint-disable-next-line no-unused-vars
  const history = useHistory();

  const [navShown, setNavShown] = React.useState();

  function toggleNav() {
    navShown ? setNavShown(false) : setNavShown(true)
  }

  return (
    <div className='page'>
      <Switch>
        <Route path='/' exact>
          <Redirect to="/movies" />
        </Route>
        <Route path='/main'>
          <Main toggleNav={toggleNav} navShown={navShown} isLoggedIn={isLoggedIn} />
        </Route>
        <Route path='/signup'>
          <Register />
        </Route>
        <Route path='/signin'>
          <Login />
        </Route>
        <ProtectedRoute path='/profile' component={Profile} isLoggedIn={isLoggedIn} toggleNav={toggleNav} navShown={navShown} user={user}  />
        <ProtectedRoute path='/saved-movies' component={SavedMovies} isLoggedIn={isLoggedIn} toggleNav={toggleNav} navShown={navShown} />
        <ProtectedRoute path='/movies' component={Movies} isLoggedIn={isLoggedIn} toggleNav={toggleNav} navShown={navShown} />
        <Route path='/404'>
          <PageNotFound />
        </Route>
        <Route path="*">
          <Redirect to="/404" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
