import React from 'react';

function Footer() {
  return (
    <footer className='footer'>
      <p className='footer__subline'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className='footer__menu'>
        <p className='footer__copy'>&copy; 2021</p>
        <nav>
          <ul className='footer__menu-list'>
            <li><a className='footer__menu-item' href='https://praktikum.yandex.ru'>Яндекс.Практикум</a></li>
            <li><a className='footer__menu-item' href='https://github.com/vvsinelnikov'>Github</a></li>
            <li><a className='footer__menu-item' href='https://www.facebook.com/sinelnikov.vv'>Facebook</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;