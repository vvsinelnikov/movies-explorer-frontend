import React from 'react';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import api from '../../utils/MainApi';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import NavigationContext from '../../contexts/NavigationContext';
import formValidaton from '../FormValidation/FormValidation';

function Login(props) {
  const { navShown, setNavShown } = React.useContext(NavigationContext);
  React.useEffect(() => {
    setNavShown(false)
  }, []);

  const currentUser = React.useContext(CurrentUserContext);
  const [editProfile, setEditProfile] = React.useState(false);

  function handleSignOut() {
    api.signout()
      .then(res => {
        console.log(res);
        props.setСurrentUser({
          'isLoggedIn': false,
        });
      history.push('/main')
    })
    .catch(err => console.log(err))
  }

  const { values, handleInputChange, errors, isValid, validationOn, setValidationOn, resetForm } = formValidaton();
  const [saveProfileError, setSaveProfileError] = React.useState(''); // ошибка ответа API

  function handleEditProfile(value) {
    resetForm();
    setEditProfile(value)
  }

  function handleSaveProfile(evt) {
    evt.preventDefault();
    setValidationOn(true);
    setSaveProfileError('');
    if (isValid) {
      api.editProfile(values.name, values.email)
        .then(res => {
          props.setСurrentUser({
            'isLoggedIn': true,
            '_id': res._id,
            'name': res.name,
            'email': res.email
          });
          setEditProfile(false)
        })
        .catch(err => {
          setSaveProfileError(err.message || err.status + ' ' + err.statusText)
        })
    }
  }

  return (
    <>
    <Header />
      <div className='main'>
      { navShown ? ( <Navigation /> ) : ( <></> ) }
      { editProfile ? (
        <form className='login' onSubmit={() => handleSaveProfile} noValidate >
          <div className='login__authorize'>
          <h1 className='login__title_profile'>Обновление профиля</h1>
            <label className='login__label'>Имя<input name='name' onChange={handleInputChange} pattern='[a-zA-Zа-яёА-ЯЁ0-9\s-]*' type='text' className='login__input' minLength='2' maxLength='30' required /></label>
            <span className={!isValid && validationOn ? 'login__error' : 'login__error login__error_hidden'}>{errors.name}</span>
            <label className='login__label'>E-mail<input name='email' onChange={handleInputChange} type='email' className='login__input'  maxLength='30' required /></label>
            <span className={!isValid && validationOn ? 'login__error' : 'login__error login__error_hidden'}>{errors.email}</span>
          </div>
          <div className='login__register_reg'>
            <span className={saveProfileError ? 'login__error' : 'login__error login__error_hidden'}>{saveProfileError}</span>
            <input type='submit' value='Сохранить' className='login__button' disabled={validationOn ? !isValid : ''} />
            <p onClick={() => handleEditProfile(false)} className='profile__text'>Отменить</p>
          </div>
        </form>
      ) : (
        <section className='login'>
          <div className='login__authorize'>
            <h1 className='login__title_profile'>Привет, {currentUser.name}</h1>
            <div className='profile__line'>
              <h2 className='profile__subheading'>Имя</h2><p className='profile__subheading profile__subheading_value'>{currentUser.name}</p>
            </div>
            <div className='profile__line profile__line_last'>
              <h2 className='profile__subheading'>E-mail</h2><p className='profile__subheading profile__subheading_value'>{currentUser.email}</p>
            </div>
          </div>
          <div className='login__register'>
            <p onClick={() => handleEditProfile(true)} className='profile__text'>Редактировать</p>
            <p onClick={() => handleSignOut} className='profile__text profile__text_red'>Выйти из аккаунта</p>
          </div>
        </section>
      )}

      </div>
    </>
  );
}

export default Login;
