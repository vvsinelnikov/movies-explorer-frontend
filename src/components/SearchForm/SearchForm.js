import React from 'react';
import FilterCheckboxk from '../FilterCheckbox/FilterCheckbox';

function SearchForm(props) {

  return (
    <section className='search-form'>
      <form className='search-form__form' onSubmit={props.handleSearch} noValidate >
        <input type='search' onChange={props.handleSearchChange} maxLength='140' placeholder='Фильм' className='search-form__input' required />
        <input type='submit' value='' className='search-form__button' disabled={props.searchValidationState.validation ? props.searchValidationState.isDisabled : ''} />
      </form>
      <span className={ props.searchValidationState.validation && !props.searchValidationState.isValid ? 'search-form__error' : 'search-form__error search-form__error_hidden'}>Нужно ввести ключевое слово</span>
      <FilterCheckboxk isShort={props.isShort} handleIsShortChange={props.handleIsShortChange} />
    </section>
  );
}

export default SearchForm;