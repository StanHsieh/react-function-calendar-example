import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { generateYears } from './libraries/utils';
import { modeEnum } from './libraries/enum';
import Header from './Header';

const Year = ({ viewDate, selected, handleMode, handleViewDate }) => {
  const years = generateYears(viewDate);
  const selectedYear = selected ? selected.getFullYear() : null;
  const handlePrevTenYears = () => {
    handleViewDate(new Date(viewDate.getFullYear() - 10, viewDate.getMonth(), 1));
  }
  const handleNextTenYears = () => {
    handleViewDate(new Date(viewDate.getFullYear() + 10, viewDate.getMonth(), 1));
  }
  return (
    <div className="calendar-container">
      <Header
        title={`${years[1].y}-${years[10].y}`}
        handlePrev={handlePrevTenYears}
        handleNext={handleNextTenYears}
        handleMode={handleMode}
      />
      <div className="calendar-main">
        {years.map(({ y, isCurr }) => (
          <div
            key={y}
            className={cn({
              selected: y === selectedYear,
              disabled: isCurr == false,
            })}
            onClick={() => {
              if (isCurr) {
                handleMode(modeEnum.MONTH, new Date(y, viewDate.getMonth(), 1));
              }
            }}
          >
            {y}
          </div>
        ))}
      </div>
    </div>
  )
}

Year.propTypes = {
  viewDate: PropTypes.instanceOf(Date),
  selected: PropTypes.instanceOf(Date),
  handleMode: PropTypes.func,
  handleSelect: PropTypes.func,
  handleViewDate: PropTypes.func,
};

export default Year;