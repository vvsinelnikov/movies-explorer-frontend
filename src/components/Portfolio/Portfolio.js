import React from 'react';

function Portfolio() {
  return (
    <section className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>
      <ul className='portfolio__porfolio-list'>
        <li><a className='portfolio__porfolio-link' rel='noreferrer' href='https://vvsinelnikov.github.io/how-to-learn/' target='_blank'><div>Статичный сайт</div><div>&#8599;</div></a></li>
        <li><a className='portfolio__porfolio-link' rel='noreferrer' href='https://vvsinelnikov.github.io/russian-travel/' target='_blank'><div>Адаптивный сайт</div><div>&#8599;</div></a></li>
        <li><a className='portfolio__porfolio-link portfolio__porfolio-link_last' rel='noreferrer' href='https://mesto-vv.nomoredomains.monster/' target='_blank'><div>Одностраничное приложение</div><div>&#8599;</div></a></li>
      </ul>
    </section>
  );
}

export default Portfolio;