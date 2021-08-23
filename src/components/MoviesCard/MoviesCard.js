import React from 'react';
import { useLocation } from 'react-router-dom';
import moviesApi from '../../utils/MoviesApi';

function MoviesCard({movie, likeClick}) {

  function getTimeFromMins(mins) {
    const hours = Math.trunc(mins/60);
    const minutes = mins % 60;
    return (hours > 0 ? hours + 'ч ' : (' ')) + (minutes === 0 ? '' : minutes + 'м')
  }

  function handleLikeClick() { likeClick(movie) }

  function usePathname() {
    const location = useLocation();
    return location.pathname;
  }

  return (
    <li className='movies-card__card'>
      <figure className='movies-card__cover'>
        <a href={movie.trailerLink} target='_blank' rel='noreferrer'><img className='movies-card__image' src={moviesApi.serverUrl + movie.image.url} alt={movie.nameRU} /></a>
        <div className='movies-card__block'>
          <figcaption className='movies-card__caption'>{movie.nameRU}</figcaption>
          { usePathname() === '/saved-movies' && <input type='button' className='movies-card__button_remove' onClick={ handleLikeClick }/> }
          { usePathname() === '/movies' && <input type='button' className={ movie.isLiked ? ('movies-card__button_like movies-card__button_liked') : ('movies-card__button_like') } onClick={ handleLikeClick }/> }
        </div>
      </figure>
      <p className='movies-card__duration'>{getTimeFromMins(movie.duration)}</p>
    </li>
  );
}

export default MoviesCard;
