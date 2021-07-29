import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import cards from '../../utils/cards'

function MoviesCardList(props) {

  function resultCards() {
    if (props.isShort) { return cards.filter(item => item.duration < 60 ) }
    return cards
  }

  return (
    <>
      <ul className='movies-cards-list'>
        {resultCards().map((item) => {
          return <MoviesCard page={props.page} card={item} key={item._id} /> })}
      </ul>
      <div className='movies-cards-list__preloader'>
        <input type='button' value='Еще' className='movies-cards-list__preloader-button'/>
      </div>
    </>
  );
}

export default MoviesCardList;
