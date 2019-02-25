import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { formatDate } from './libraries/utils';

let time;

const Input = ({ format, selected, placeholder, handleFocus, handleSelect }) => {
  const [value, setValue] = useState(formatDate(selected, format));
  const handleChange = (e) => {
    clearTimeout(time);
    const newValue = e.target.value;
    setValue(newValue);
    if (/^\d{4}\-\d{1,2}\-\d{1,2}$/.test(newValue)) {
      const newSelected = new Date(newValue);
      if (!isNaN(newSelected.getTime())) {
        time = setTimeout(() => handleSelect(new Date(newValue), true), 500);
      }
    }
  }
  useEffect(() => {
    setValue(formatDate(selected, format));
  }, [selected]);
  return (
    <input
      type="text"
      className="calendar-input"
      value={value}
      placeholder={placeholder}
      onFocus={handleFocus}
      onChange={handleChange}
    />
  );
}

Input.propTypes = {
  format: PropTypes.string,
  selected: PropTypes.instanceOf(Date),
  placeholder: PropTypes.string,
  handleFocus: PropTypes.func,
  handleSelect: PropTypes.func,
};

export default Input;