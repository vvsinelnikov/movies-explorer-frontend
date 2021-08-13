/* eslint-disable no-unused-vars */
import React from 'react';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';

function MoviesCard({movie, page, likeMovie, dislikeMovie}) {

  function getTimeFromMins(mins) {
    const hours = Math.trunc(mins/60);
    const minutes = mins % 60;
    return (hours > 0 ? hours + 'ч ' : (' ')) + (minutes === 0 ? '' : minutes)
  }

  return (
    <li className='movies-card__card'>
      <figure className='movies-card__cover'>
        <a href={movie.trailerLink} target='_blank' rel='noreferrer'><img className='movies-card__image' src={moviesApi.serverUrl + movie.image.url} alt={movie.nameRU} /></a>
        <div className='movies-card__block'><figcaption className='movies-card__caption'>{movie.nameRU}</figcaption><input type='button' className={page === 'Movies' ? 'movies-card__button_like' : 'movies-card__button_remove' } onClick={ () => likeMovie(movie.id) }/></div>
      </figure>
      <p className='movies-card__duration'>{getTimeFromMins(movie.duration)}</p>
    </li>
  );
}

export default MoviesCard;
