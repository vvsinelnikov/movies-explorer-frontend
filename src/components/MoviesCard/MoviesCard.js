import React from 'react';

function MoviesCard({card, page}) {

  function getTimeFromMins(mins) {
    const hours = Math.trunc(mins/60);
    const minutes = mins % 60;
    return (hours > 0 ? hours + 'ч ' : (' ')) + (minutes === 0 ? '' : minutes)
  }

  return (
    <li className='movies-card__card'>
      <figure className='movies-card__cover'>
        <img className='movies-card__image' src={card.url} alt={card.title} />
        <div className='movies-card__block'><figcaption className='movies-card__caption'>{card.title}</figcaption><input type='button' className={page === 'Movies' ? 'movies-card__button_like' : 'movies-card__button_remove' }/></div>
      </figure>
      <p className='movies-card__duration'>{getTimeFromMins(card.duration)}</p>
    </li>
  );
}

export default MoviesCard;
