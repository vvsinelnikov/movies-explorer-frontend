import React from 'react';
import { useHistory } from 'react-router-dom';

function Header() {

  const history = useHistory();
  function goBack() {
    history.goBack()
  }

  return (
    <section className='page-not-found'>
      <h1 className='page-not-found__title'>404</h1>
      <p className='page-not-found__text'>Страница не найдена</p>
      <nav className='page-not-found__back-button' onClick={goBack}>Назад</nav>
    </section>
  );
}

export default Header;