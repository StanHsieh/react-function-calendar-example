import React from 'react';
import PropTypes from 'prop-types';
import { withLocale } from './hocs/locale';
import { generateDays, getDateStr } from './libraries/utils';
import { modeEnum } from './libraries/enum';
import Header from './Header';
import DayItem from './DayItem';

const Day = ({ i18n, viewDate, selected, handleMode, handleSelect, handleViewDate }) => {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth() + 1;
  const daysArray = generateDays(viewDate);
  const todayStr = getDateStr(new Date());
  const selectedStr = getDateStr(selected);
  const handlePrevMonth = () => {
    handleViewDate(new Date(year, month - 2, 1));
  }
  const handleNextMonth = () => {
    handleViewDate(new Date(year, month, 1));
  }
  return (
    <div className="calendar-container">
      <Header
        title={`${i18n[`month.${month}`]} ${year}`}
        nextMode={modeEnum.MONTH}
        handlePrev={handlePrevMonth}
        handleNext={handleNextMonth}
        handleMode={handleMode}
      />
      <div>
        <div className="row title">
          <div>{i18n['week.0']}</div>
          <div>{i18n['week.1']}</div>
          <div>{i18n['week.2']}</div>
          <div>{i18n['week.3']}</div>
          <div>{i18n['week.4']}</div>
          <div>{i18n['week.5']}</div>
          <div>{i18n['week.6']}</div>
        </div>
        {daysArray.map((days, index) => (
          <div key={`daysArray-${index}`} className="row">
            {days.map(data =>
              <DayItem
                key={`${data.y}-${data.m}-${data.d}`}
                data={data}
                todayStr={todayStr}
                selectedStr={selectedStr}
                handleSelect={handleSelect}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

Day.propTypes = {
  viewDate: PropTypes.instanceOf(Date),
  selected: PropTypes.instanceOf(Date),
  handleMode: PropTypes.func,
  handleSelect: PropTypes.func,
  handleViewDate: PropTypes.func,
};

export default withLocale(Day);