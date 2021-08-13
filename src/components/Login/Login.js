/* eslint-disable no-unused-vars */
import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import api from '../../utils/MainApi';
import formValidaton from '../FormValidation/FormValidation';

function Login(props) {
  const history = useHistory();
  const { values, handleInputChange, errors, isValid, validationOn, setValidationOn, resetForm } = formValidaton();
  const [loginError, setLoginError] = React.useState(''); // ошибка ответа API

  function handleLogin(evt) {
    evt.preventDefault();
    setValidationOn(true);
    setLoginError('');
    if (isValid) {
      api.signin(values.email, values.password)
        .then((data) => {
          if (data.jwt) {
              props.setСurrentUser({
                'isLoggedIn': true,
                '_id': data._id,
                'name': data.name,
                'email': data.email
              });
              resetForm();
              history.push('/movies');
          }
        })
        .catch(err => {
          setLoginError(err.message || err.status + ' ' + err.statusText)
        })
    }
  }

  return (
    <div className='main'>
      <form className='login' onSubmit={handleLogin} noValidate >
        <div className='login__authorize'>
          <NavLink to='/' className='login__logo' />
          <h1 className='login__title'>Рады видеть!</h1>
          <label className='login__label'>E-mail<input name='email' onChange={handleInputChange} type='email' className='login__input'  maxLength='30' required /></label>
          <span className={!isValid && validationOn ? 'login__error' : 'login__error login__error_hidden'}>{errors.email}</span>
          <label className='login__label'>Пароль<input name='password' onChange={handleInputChange} type='password' className='login__input'  minLength='2' maxLength='30' required /></label>
          <span className={!isValid && validationOn ? 'login__error' : 'login__error login__error_hidden'}>{errors.password}</span>
        </div>
        <div className='login__register'>
          <span className={loginError ? 'login__error' : 'login__error login__error_hidden'}>{loginError}</span>
          <input type='submit' value='Войти' className='login__button' disabled={validationOn ? !isValid : ''} />
          <p className='login__text'>Ещё не зарегистрированы? <a className='login__text_link' href='/signup'>Регистрация</a></p>
        </div>
      </form>
    </div>
  );
}

export default Login;
