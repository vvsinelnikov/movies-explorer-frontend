import React from 'react';

function AboutMe() {
  return (
    <section className='about-me'>
      <h2 className='about-me__title'>Студент</h2>
      <div className='about-me__main'>
        <div className='about-me__info'>
          <h3 className='about-me__subtitle'>Владимир</h3>
          <p className='about-me__subline'>Фронтенд-разработчик, 30 лет</p>
          <p className='about-me__text'>Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить.
    С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
          <ul className='about-me__links'>
            <li><a className='about-me__link' rel='noreferrer' target='_blank' href='https://www.facebook.com/sinelnikov.vv'>Facebook</a></li>
            <li><a className='about-me__link' rel='noreferrer' target='_blank' href='https://github.com/vvsinelnikov'>Github</a></li>
          </ul>
        </div>
        <img className='about-me__photo' src='http://' alt='Это я' />
      </div>
    </section>
  );
}

export default AboutMe;