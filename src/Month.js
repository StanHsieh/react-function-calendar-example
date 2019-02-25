import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { withLocale } from './hocs/locale';
import { modeEnum } from './libraries/enum';
import Header from './Header';

const monthArray = [1,2,3,4,5,6,7,8,9,10,11,12];

const Month = ({ i18n, viewDate, selected, handleMode, handleViewDate }) => {
  const year = viewDate.getFullYear();
  const selectedYear = selected ? selected.getFullYear() : null;
  const selectedMonth = year === selectedYear ? selected.getMonth() + 1 : null;
  const handlePrevYear = () => {
    handleViewDate(new Date(year - 1, viewDate.getMonth(), 1));
  }
  const handleNextYear = () => {
    handleViewDate(new Date(year + 1, viewDate.getMonth(), 1));
  }
  return (
    <div className="calendar-container">
      <Header
        title={year}
        nextMode={modeEnum.YEAR}
        handlePrev={handlePrevYear}
        handleNext={handleNextYear}
        handleMode={handleMode}
      />
      <div className="calendar-main">
        {monthArray.map(id => (
          <div
            key={`${year}-${id}`}
            className={cn({ selected: id === selectedMonth})}
            onClick={() => {
              handleMode(modeEnum.DAY, new Date(year, id - 1, 1));
            }}
          >
            {i18n[`month.${id}`]}
          </div>
        ))}
      </div>
    </div>
  )
}

Month.propTypes = {
  viewDate: PropTypes.instanceOf(Date),
  selected: PropTypes.instanceOf(Date),
  handleMode: PropTypes.func,
  handleSelect: PropTypes.func,
  handleViewDate: PropTypes.func,
};

export default withLocale(Month);