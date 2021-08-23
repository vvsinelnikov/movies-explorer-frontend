import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {

  return (
    <ul className='movies-cards-list'>
      { props.filteredMovies().map(m => { return (<MoviesCard likeClick={props.likeClick} movie={m} key={m.id} />) }) }
    </ul>
  );
}

export default MoviesCardList;
