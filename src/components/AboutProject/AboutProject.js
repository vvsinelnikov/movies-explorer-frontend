import React from 'react';

function AboutProject() {
  return (
    <section className='about-project'>
      <h2 className='about-project__title'>О проекте</h2>
      <div className='about-project__table'>
        <div>
          <h3 className='about-project__subtitle'>Дипломный проект включал 5 этапов</h3>
          <p className='about-project__text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div>
          <h3 className='about-project__subtitle'>На выполнение диплома ушло 5 недель</h3>
          <p className='about-project__text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className='about-project__progress'>
        <div className='about-project__progress_week-one'>1 неделя</div>
        <div className='about-project__progress_week-four'>4 недели</div>
        <div className='about-project__progress_subline'>Back-end</div>
        <div className='about-project__progress_subline'>Fronet-end</div>
      </div>
    </section>
  );
}

export default AboutProject;