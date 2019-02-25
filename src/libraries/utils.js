import { DAYS } from './enum';

export const formatDate = (date, format) => {
  if (!date) return '';
  const y = date.getFullYear();
  let m = date.getMonth() + 1;
  let d = date.getDate();
  if (m <= 9) m = `0${m}`;
  if (d <= 9) d = `0${d}`;
  return format.replace(/YYYY/g, y).replace(/MM/g, m).replace(/DD/g, d);
}

export const generateDays = (date) => {
  let days = [];
  const currYear = date.getFullYear();
  const currMonth = date.getMonth();
  const currLastDay = new Date(currYear, currMonth + 1, 0);
  const currLastDate = currLastDay.getDate();
  const currDay = new Date(currYear, currMonth, 1).getDay();
  if (currDay !== 0) {
    const prevLastDay = new Date(currYear, currMonth, 0);
    const prevYear = prevLastDay.getFullYear();
    const prevMonth = prevLastDay.getMonth();
    const prevLastDate = prevLastDay.getDate();
    for(let i = 0; i < currDay; i++) {
      days.unshift({
        y: prevYear,
        m: prevMonth,
        d: prevLastDate - i,
        isCurr: false,
      });
    }
  }
  for(let i = 1; i <= currLastDate; i++) {
    days.push({
      y: currYear,
      m: currMonth,
      d: i,
      isCurr: true,
    });
  }
  if (days.length < DAYS) {
    const nextFirstDay = new Date(currYear, currMonth + 1, 1);
    const nextYear = nextFirstDay.getFullYear();
    const nextMonth = nextFirstDay.getMonth();
    const nextCount = DAYS - days.length;
    for(let i = 1; i <= nextCount; i++) {
      days.push({
        y: nextYear,
        m: nextMonth,
        d: i,
        isCurr: false,
      });
    }
  }
  let newDays = [];
  for(let i = 0; i < DAYS; i += 7) {
    newDays.push(days.slice(i, i + 7));
  }
  return newDays;
}

export const getDate = (date) => {
  if (date === null) return new Date();
  return typeof date === 'object' ? date : new Date(date);
}

export const getDateStr = (date) => {
  if (!date) return null;
  const y = date.getFullYear();
  const m = date.getMonth();
  const d = date.getDate();
  return `${y}-${m}-${d}`;
}

export const generateYears = (date) => {
  const year = date.getFullYear();
  const firstYear = Math.floor(year * 0.1) * 10;
  let years = Array(12);
  years[0] = { y: firstYear - 1, isCurr: false };
  for(let i = 0; i < 10; i++) {
    years[i + 1] = { y: firstYear + i, isCurr: true };
  }
  years[11] = { y: firstYear + 10, isCurr: false };
  return years;
}