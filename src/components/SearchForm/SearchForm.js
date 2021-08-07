import React from 'react';
import FilterCheckboxk from '../FilterCheckbox/FilterCheckbox';

function SearchForm(props) {

  return (
    <section className='search-form'>
      <div className='search-form__form'>
        <input type='search' maxLength='140' placeholder='Фильм' className='search-form__input' required />
        <input type='submit' value='' className='search-form__button' />
      </div>
      <FilterCheckboxk isShort={props.isShort} handleChange={props.handleChange} />
    </section>
  );
}

export default SearchForm;