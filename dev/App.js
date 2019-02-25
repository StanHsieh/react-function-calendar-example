import React, { useState } from 'react';
import Calendar from 'calendar';

const App = () => {
  const [date, setDate] = useState(null);
  const handleSelect = (newDate) => {
    setDate(newDate);
  }
  return (
    <div>
      <div style={{ margin: '16px 0'}}>
        <label>Date: </label>
        {date ? date.toString() : null}
      </div>
      <div>
        <Calendar
          date={date}
          onSelect={handleSelect}
        />
      </div>
      <div style={{ marginTop: 30 }}>
        <Calendar
          locale='tw'
          focusing={true}
          enableInputCanlendar={false}
          enableOutsideCanlendar={false}
          date={date}
          onSelect={handleSelect}
        />
      </div>
      <div style={{ marginTop: 30 }}>
        <Calendar
          locale='en'
          focusing={true}
          enableInputCanlendar={true}
          enableOutsideCanlendar={false}
          date={date}
          onSelect={handleSelect}
        />
      </div>
    </div>
  )
};

export default App;