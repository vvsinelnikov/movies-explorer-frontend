import React from 'react';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';

function Login(props) {

  return (
    <>
    <Header toggleNav={props.toggleNav} isLoggedIn={props.isLoggedIn} />
      <div className='main'>
      { props.navShown ? ( <Navigation isLoggedIn={props.isLoggedIn} toggleNav={props.toggleNav}/> ) : ( <></> ) }
        <section className='login'>
          <div className='login__authorize'>
            <h1 className='login__title_profile'>Привет, {props.user.name}</h1>
            <div className='profile__line'>
              <h2 className='profile__subheading'>Имя</h2><p className='profile__subheading profile__subheading_value'>{props.user.name}</p>
            </div>
            <div className='profile__line profile__line_last'>
              <h2 className='profile__subheading'>E-mail</h2><p className='profile__subheading profile__subheading_value'>{props.user.email}</p>
            </div>
          </div>
          <div className='login__register'>
            <a href='/edit-profile' className='profile__text'>Редактировать</a>
            <a href='/signout' className='profile__text profile__text_red'>Выйти из аккаунта</a>
          </div>
        </section>
      </div>
    </>
  );
}

export default Login;
