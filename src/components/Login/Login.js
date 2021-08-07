import React from 'react';
import { NavLink } from 'react-router-dom';

function Login() {

  return (
    <div className='main'>
      <section className='login'>
        <div className='login__authorize'>
          <NavLink to='/' className='login__logo' />
          <h1 className='login__title'>Рады видеть!</h1>
          <label className='login__label'>E-mail<input type='email' className='login__input' /></label>
          <span className='login__error'>Ошибка</span>
          <label className='login__label'>Пароль<input type='password' className='login__input' /></label>
          <span className='login__error'>Ошибка</span>
        </div>
        <div className='login__register'>
          <input type='button' value='Войти' className='login__button'/>
          <p className='login__text'>Ещё не зарегистрированы? <a className='login__text_link' href='/signup'>Регистрация</a></p>
        </div>
      </section>
    </div>
  );
}

export default Login;
