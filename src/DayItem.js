import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const DayItem = ({ data: { y, m, d, isCurr }, todayStr, selectedStr, handleSelect }) => {
  const dateStr = `${y}-${m}-${d}`;
  return (
    <div
      className={cn({
        curr: isCurr,
        disabled: isCurr === false,
        today: dateStr === todayStr,
        selected: dateStr === selectedStr,
      })}
      onClick={() => {
        if (isCurr) {
          handleSelect(new Date(y, m , d));
        }
      }}
    >
      {d}
    </div>
  );
}

DayItem.propTypes = {
  data: PropTypes.object,
  todayStr: PropTypes.string,
  selectedStr: PropTypes.string,
  handleSelect: PropTypes.func,
};

export default DayItem;