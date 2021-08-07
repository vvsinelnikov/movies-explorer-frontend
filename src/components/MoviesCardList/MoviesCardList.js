import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {

  return (
    <>
      <ul className='movies-cards-list'>
        {props.filteredMovies().map((movie) => {
          return <MoviesCard page={props.page} movie={movie} key={movie.id} /> })}
      </ul>
    </>
  );
}

export default MoviesCardList;
