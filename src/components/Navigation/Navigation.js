import React from 'react';
import { NavLink } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import NavigationContext from '../../contexts/NavigationContext';

function Navigation() {
  const currentUser = React.useContext(CurrentUserContext);
  const { setNavShown } = React.useContext(NavigationContext);

  return (
    <div className='navigation'>
      <nav className='navigation__burger-menu' onClick={() => setNavShown(false)}></nav>
      <nav className='navigation__main-menu'>
        <NavLink className='navigation__text' activeClassName='navigation__text_active' to='main' >Главная</NavLink>
        <NavLink className='navigation__text' activeClassName='navigation__text_active' to='movies' >Фильмы</NavLink>
        <NavLink className='navigation__text' activeClassName='navigation__text_active' to='saved-movies' >Сохраненные фильмы</NavLink>
      </nav>
      <nav className='navigation__account-menu'>
        {currentUser.isLoggedIn ? (
          <NavLink className='navigation__button_profile' to="/profile" >
            <div>Аккаунт</div>
            <div className='navigation__profile-icon'></div>
          </NavLink>
        ) : ( <></> )}
      </nav>
    </div>
  );
}

export default Navigation;