import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ title, nextMode, handlePrev, handleNext, handleMode }) => {
  const handleClick = () => {
    if (nextMode) {
      handleMode(nextMode)
    }
  }
  return (
    <div className="calendar-header">
      <div onClick={handlePrev}><i className="arrow left" /></div>
      <div className="calendar-header-title" onClick={handleClick}>{title}</div>
      <div onClick={handleNext}><i className="arrow right" /></div>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  nextMode: PropTypes.string,
  handlePrev: PropTypes.func,
  handleNext: PropTypes.func,
  handleMode: PropTypes.func,
};

export default Header;