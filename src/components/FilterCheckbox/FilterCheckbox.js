import React from 'react';

function FilterCheckbox(props) {

  return (
    <label className='filter-checkbox__shortie'>
      <input type='checkbox' checked={props.isShort} onChange={props.handleIsShortChange} className='filter-checkbox__switch' />
      <span className='filter-checkbox__switch-copy'>Короткометражки</span>
    </label>
  );
}

export default FilterCheckbox;

