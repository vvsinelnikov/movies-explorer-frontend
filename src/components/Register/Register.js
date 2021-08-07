/* eslint-disable no-unused-vars */
import React from 'react';
import { NavLink } from 'react-router-dom';
import api from '../../utils/MainApi';

function Login() {
  // Стейт настроек валидации
  const [registrationValidationState, setRegistrationValidationState] = React.useState({
    nameValid: false,
    nameError: '',
    emailValid: false,
    emailError: '',
    passwordValid: false,
    passwordError: '',
    formValid: false,
    validation: false
  });

  function handleInputChange(evt) {
    setRegistrationValidationState(prev => ({...prev,
      [evt.target.name]: evt.target.value}));
    chechRegistrationValidity(evt.target);
  }

  function chechRegistrationValidity(target) {
    if (target) {
      if (target.validity.valid) {
        setRegistrationValidationState(prev => ({...prev,
          [`${target.name}Valid`]: true,
          [`${target.name}Error`]: '',
        }));
      }
      else {
        setRegistrationValidationState(prev => ({...prev,
          [`${target.name}Valid`]: false,
          [`${target.name}Error`]: `${target.validationMessage}`,
        }));
      }
      target.closest('form').checkValidity() ?
        setRegistrationValidationState(prev => ({...prev, formValid: true})) :
        setRegistrationValidationState(prev => ({...prev, formValid: false}));
    }
  }

  const name = React.useRef();
  const email = React.useRef();
  const password = React.useRef();

  function handleRegister(evt) {
    if (evt) { evt.preventDefault(); }
    setRegistrationError('');
    chechRegistrationValidity(name.current);
    chechRegistrationValidity(email.current);
    chechRegistrationValidity(password.current);
    setRegistrationValidationState(prev => ({...prev,
      validation: true}));
    if (registrationValidationState.formValid) {
      api.signup(name.current.value, email.current.value, password.current.value)
        .then(res => console.log(res))
        .catch(err => {
          setRegistrationError(err.message || err.status + ' ' + err.statusText)
        })
    }
  }

  const [registrationError, setRegistrationError] = React.useState(''); // ошибка ответа API


  return (
    <div className='main'>
      <form className='login' onSubmit={handleRegister} noValidate >
        <div className='login__authorize'>
          <NavLink to='/' className='login__logo' />
          <h1 className='login__title'>Добро пожаловать!</h1>
          <label className='login__label'>Имя<input ref={name} name='name' onChange={handleInputChange} pattern='[a-zA-Zа-яёА-ЯЁ0-9\s-]*' type='text' className='login__input' minLength='2' maxLength='30' required /></label>
          <span className={registrationValidationState.validation && !registrationValidationState.isNameValid ? 'login__error' : 'login__error login__error_hidden'}>{registrationValidationState.nameError}</span>
          <label className='login__label'>E-mail<input ref={email} name='email' onChange={handleInputChange} type='email' className='login__input'  maxLength='30' required /></label>
          <span className={registrationValidationState.validation && !registrationValidationState.isEmailValid ? 'login__error' : 'login__error login__error_hidden'}>{registrationValidationState.emailError}</span>
          <label className='login__label'>Пароль<input ref={password} name='password' onChange={handleInputChange} type='password' className='login__input'  minLength='2' maxLength='30' required /></label>
          <span className={registrationValidationState.validation && !registrationValidationState.isPasswordValid ? 'login__error' : 'login__error login__error_hidden'}>{registrationValidationState.passwordError}</span>
        </div>
        <div className='login__register_reg'>
          <span className={registrationError ? 'login__error' : 'login__error login__error_hidden'}>{registrationError}</span>
          <input type='submit' value='Зарегистрироваться' className='login__button' disabled={registrationValidationState.validation ? !registrationValidationState.formValid : false} />
          <p className='login__text'>Уже зарегистрированы? <a className='login__text_link' href='/signin'>Войти</a></p>
        </div>
      </form>
    </div>
  );
}

export default Login;
