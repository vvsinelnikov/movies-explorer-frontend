import React from 'react';
import { NavLink } from 'react-router-dom';

function Login() {

  return (
    <div className='main'>
      <section className='login'>
        <div className='login__authorize'>
          <NavLink to='/' className='login__logo' />
          <h1 className='login__title'>Добро пожаловать!</h1>
          <label className='login__label'>Имя<input type='text' className='login__input' /></label>
          <span className='login__error'>Ошибка</span>
          <label className='login__label'>E-mail<input type='email' className='login__input' /></label>
          <span className='login__error'>Ошибка</span>
          <label className='login__label'>Пароль<input type='password' className='login__input' /></label>
          <span className='login__error'>Ошибка</span>
        </div>
        <div className='login__register_reg'>
          <input type='button' value='Зарегистрироваться' className='login__button'/>
          <p className='login__text'>Уже зарегистрированы? <a className='login__text_link' href='/signin'>Войти</a></p>
        </div>
      </section>
    </div>
  );
}

export default Login;
