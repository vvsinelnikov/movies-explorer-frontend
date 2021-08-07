import React from 'react';

function Techs() {
  return (
    <section className='techs'>
      <h2 className='techs__title'>Технологии</h2>
      <h3 className='techs__subtitle'>7 технологий</h3>
      <p className='techs__subline'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <ul className='techs__techs-list'>
        <li className='techs__techs-item'>HTML</li>
        <li className='techs__techs-item'>CSS</li>
        <li className='techs__techs-item'>JS</li>
        <li className='techs__techs-item'>React</li>
        <li className='techs__techs-item'>GIT</li>
        <li className='techs__techs-item'>Express.js</li>
        <li className='techs__techs-item'>mongoDB</li>
      </ul>
    </section>
  );
}

export default Techs;