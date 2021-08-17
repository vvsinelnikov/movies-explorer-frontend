import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import api from '../../utils/MainApi';
import formValidaton from '../FormValidation/FormValidation';

function Login(props) {
  const history = useHistory();
  const { values, handleInputChange, errors, isValid, validationOn, setValidationOn, resetForm } = formValidaton();
  const [registrationError, setRegistrationError] = React.useState(''); // ошибка ответа API

  function handleRegister(evt) {
    evt.preventDefault();
    setValidationOn(true);
    setRegistrationError('');
    if (isValid) {
      api.signup(values.name, values.email, values.password)
        .then((data) => {
          if (data.jwt) {
              props.setСurrentUser({
                'isLoggedIn': true,
                '_id': data._id,
                'name': data.name,
                'email': data.email
              });
              resetForm();
              localStorage.removeItem('lastMovies');
              history.push('/movies');
          }
        })
        .catch(err => {
          console.log(err);
          setRegistrationError(err.message || err.status + ' ' + err.statusText)
        })
    }
  }

  return (
    <div className='main'>
      <form className='login' onSubmit={handleRegister} noValidate >
        <div className='login__authorize'>
          <NavLink to='/' className='login__logo' />
          <h1 className='login__title'>Добро пожаловать!</h1>
          <label className='login__label'>Имя<input name='name' onChange={handleInputChange} pattern='[a-zA-Zа-яёА-ЯЁ0-9\s-]*' type='text' className='login__input' minLength='2' maxLength='30' required /></label>
          <span className={!isValid && validationOn ? 'login__error' : 'login__error login__error_hidden'}>{errors.name}</span>
          <label className='login__label'>E-mail<input name='email' onChange={handleInputChange} type='email' className='login__input'  maxLength='30' required /></label>
          <span className={!isValid && validationOn ? 'login__error' : 'login__error login__error_hidden'}>{errors.email}</span>
          <label className='login__label'>Пароль<input name='password' onChange={handleInputChange} type='password' className='login__input'  minLength='2' maxLength='30' required /></label>
          <span className={!isValid && validationOn ? 'login__error' : 'login__error login__error_hidden'}>{errors.password}</span>
        </div>
        <div className='login__register_reg'>
          <span className={registrationError ? 'login__error' : 'login__error login__error_hidden'}>{registrationError}</span>
          <input type='submit' value='Зарегистрироваться' className='login__button' disabled={validationOn ? !isValid : ''} />
          <p className='login__text'>Уже зарегистрированы? <a className='login__text_link' href='/signin'>Войти</a></p>
        </div>
      </form>
    </div>
  );
}

export default Login;
