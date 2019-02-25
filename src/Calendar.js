import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import ClickOutside from 'react-click-outside';
import { getDate } from './libraries/utils';
import { modeEnum } from './libraries/enum';
import { setLocale } from './hocs/locale';
import './stylesheets/calendar.css';
import Input from './input';
import Day from './Day';
import Month from './Month';
import Year from './Year';

const Comps = {
  [modeEnum.DAY]: Day,
  [modeEnum.MONTH]: Month,
  [modeEnum.YEAR]: Year,
};

const Calendar = (props) => {
  const { date, format, placeholder, onSelect,
    enableInputCanlendar, enableOutsideCanlendar, } = props;
  const [mode, setMode] = useState(modeEnum.DAY);
  const [focusing, setFocusing] = useState(props.focusing);
  const [viewDate, setViewDate] = useState(getDate(date));
  const [selected, setSelected] = useState(null);
  const Comp = Comps[mode];
  const handleMode = (newMode, newViewDate) => {
    setMode(newMode);
    if (newViewDate) {
      setViewDate(newViewDate);
    }
  }
  const handleClickOutside = () =>  {
    if (focusing && enableOutsideCanlendar) {
      setFocusing(false);
      if (mode !== modeEnum.DAY) {
        setMode(modeEnum.DAY);
      }
    }
  };
  const handleFocus = () => {
    if (focusing === false) {
      setFocusing(true);
    }
  }
  const handleSelect = (nextSelected, nextFocusing = false) => {
    onSelect(nextSelected);
    setViewDate(nextSelected);
    setSelected(nextSelected);
    if (enableOutsideCanlendar) {
      setFocusing(nextFocusing);
    }
  }
  const handleViewDate = (nextViewDate) => {
    setViewDate(nextViewDate);
  }
  useEffect(() => {
    const newDate = getDate(date);
    setViewDate(newDate);
    if (date) {
      setSelected(newDate);
    }
  }, [date]);
  return (
    <ClickOutside
      className={cn('calendar', {
        focusing,
        'inline-calendar': !enableOutsideCanlendar,
      })}
      onClickOutside={handleClickOutside}
    >
      {enableInputCanlendar &&
        <Input
          format={format}
          selected={selected}
          placeholder={placeholder}
          handleFocus={handleFocus}
          handleSelect={handleSelect}
        />
      }
      {focusing &&
        <Comp
          viewDate={viewDate}
          selected={selected}
          handleMode={handleMode}
          handleSelect={handleSelect}
          handleViewDate={handleViewDate}
        />
      }
    </ClickOutside>
  );
}

Calendar.propTypes = {
  format: PropTypes.string,
  date: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  placeholder: PropTypes.string,
  focusing: PropTypes.bool,
  enableInputCanlendar: PropTypes.bool,
  enableOutsideCanlendar: PropTypes.bool,
  onSelect: PropTypes.func,
};

Calendar.defaultProps = {
  format: 'YYYY-MM-DD',
  date: null,
  placeholder: 'yyyy-mm-dd',
  onSelect: () => {},
  focusing: false,
  enableInputCanlendar: true,
  enableOutsideCanlendar: true,
};

export default setLocale(Calendar);