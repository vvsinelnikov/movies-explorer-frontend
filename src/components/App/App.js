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
import CurrentUserContext from '../../contexts/CurrentUserContext';
import NavigationContext from '../../contexts/NavigationContext';
import api from '../../utils/MainApi';

function App() {
  const history = useHistory();

  React.useEffect(() => { document.title = "Bitfilms" }, []);

  // Отображение бокового меню
  const [navShown, setNavShown] = React.useState(false);

  // Авторизация (валидация токена)
  const [currentUser, setСurrentUser] = React.useState({'isLoggedIn': false});
  React.useEffect(() => { tokenCheck() }, []);

  function tokenCheck () {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      api.getMyProfile(jwt)
        .then((res) => {
          if (res) {
            setСurrentUser({
              'isLoggedIn': true,
              '_id': res._id,
              'name': res.name,
              'email': res.email
              });
              history.push('/movies');
          }
        })
        .catch(err => console.log(err))
    }
  }

  return (
    <div className='page'>
      <CurrentUserContext.Provider value={currentUser}>
        <NavigationContext.Provider value={{navShown, setNavShown}}>
          <Switch>
            <Route path='/' exact>
              { currentUser.isLoggedIn ? (<Redirect to='/main' />) : (<Redirect to='/movies' />) }
            </Route>
            <Route path='/main'>
              <Main />
            </Route>
            <Route path='/signup'>
              {currentUser.isLoggedIn ?
                (<Redirect to="/movies" />) :
                (<Register setСurrentUser={setСurrentUser} />)
              }
            </Route>
            <Route path='/signin'>
              {currentUser.isLoggedIn ?
                (<Redirect to='/movies' />) :
                (<Login setСurrentUser={setСurrentUser} />)
              }
            </Route>
            <ProtectedRoute path='/profile' component={Profile} setСurrentUser={setСurrentUser} />
            <ProtectedRoute path='/saved-movies' component={SavedMovies} />
            <ProtectedRoute path='/movies' component={Movies} />
            <Route path='/404'>
              <PageNotFound />
            </Route>
            <Route path='*'>
              <Redirect to='/404' />
            </Route>
          </Switch>
        </NavigationContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
