import React from 'react';
import { NavLink } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import NavigationContext from '../../contexts/NavigationContext';

function Header() {
  const currentUser = React.useContext(CurrentUserContext);
  const { setNavShown } = React.useContext(NavigationContext);

  return (
    <header className='header'>
      <NavLink to='/' className='header__logo'></NavLink>
      <nav className='header__top-menu'>
        {currentUser.isLoggedIn ? (
          <ul className='header__menu-list'>
            <li className='header__menu-item-authorized'><NavLink to="/movies" className='header__menu-text' activeClassName='header__menu-text_active'>Фильмы</NavLink></li>
            <li className='header__menu-item-authorized'><NavLink to="/saved-movies" className='header__menu-text' activeClassName='header__menu-text_active'>Сохранённые фильмы</NavLink></li>
          </ul>
          ) : (
            <div></div>
        )}
        <ul className='header__menu-list'>
          {currentUser.isLoggedIn ? (
            <>
            <li className='header__menu-item-account'><NavLink to="/profile" className='header__menu-text header__button_profile'>
              <div>Аккаунт</div>
              <div className='header__profile-icon'></div>
            </NavLink></li>
            <nav className='header__burger-menu' onClick={() => setNavShown(true)}></nav>
            </>
          ) : (
            <>
              <li className='header__menu-item-profile'><NavLink to="/signup" className='header__menu-text'>Регистрация</NavLink></li>
              <li className='header__menu-item-profile'><NavLink to="/signin" className='header__menu-text header__button_login'>Войти</NavLink></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;