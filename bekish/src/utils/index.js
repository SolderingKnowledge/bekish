import { numOfRows, listOfWeek, listOfMonths } from '../constants';

// Get number of days for a given month and year
export const getDayCountForMonth = (currentYear, currentMonth) => new Date(currentYear, currentMonth+1, 0).getDate();

// Get first day of a given month
export const getFirstDayOfMonth = (currentYear, currentMonth) => new Date(currentYear, currentMonth, 1).getDay();

export const getNewMonth = (state, nextPrev) => {
  // get prev month/year and find a new month.
  // if no prev month then use current date.
  const date = state === undefined ? new Date() : new Date(state.currentYear, state.currentMonth + nextPrev);
  
  // get current year: 2019
  const currentYear = date.getFullYear();
  
  // get current month: April
  const currentMonth = date.getMonth();
  
  // get first day of a month: Output is number between 0-6 [sunday, monday, ...]
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
  
  // get how many days in the previous month 30,31 etc
  const prevMonthDayCount = getDayCountForMonth(currentYear, currentMonth-1)
  return {...state, currentYear, currentMonth, firstDayOfMonth, prevMonthDayCount}
}

export const updateEventUtil = (state, data) => {
  
  debugger

  return state
}

// Gets cell date/data
export const getCellDate = (row, column, state) => {
  // row => current row of calendar
  // column => current column of calendar
  // row * rowCount => gives start of sunday for that row (6,12,18)
  const { firstDayOfMonth, prevMonthDayCount, currentMonth, currentYear } = state;
  // How many days for this month
  const numsForMonth = getDayCountForMonth(currentYear, currentMonth);

  // 42days(6*7) - days of previous months
  // -2 means 2 day from this months.
  const convertingDay = row * numOfRows + column + row - firstDayOfMonth; // 
  
  //console.log('convertingDay',convertingDay)
  const currentMonthDay = convertingDay % numsForMonth + 1;

  const currentDay = currentMonthDay < 1 ? prevMonthDayCount + currentMonthDay : currentMonthDay;

  // Default name of month is current month
  let nameOfMonth = listOfMonths[currentMonth];
  if (!row && currentDay > 7) { // if first row and day is more than 7. Cause only 7 days can fit in a row
    // then month is previous month
    nameOfMonth = listOfMonths[(currentMonth || listOfMonths.length) - 1]
  } else if ((row === 4 || row === 5) && currentDay < 15) {
    // if last 2 rows and if more than 15.
    // then month is next month
    nameOfMonth = listOfMonths[(currentMonth + 1) % listOfMonths.length]
  }
  // Create a content: if first day of month then add "1 May" else just "2"
  const content = currentDay === 1 ? `${nameOfMonth.slice(0,3)} ${currentDay}` : currentDay;
  return {content, nameOfMonth, currentDay}
}

// Gets cell native events
export const getCellNativeEvent = (row, column, state) => {
  // row => current row of calendar
  // column => current column of calendar
  // row * rowCount => gives start of sunday for that row (6,12,18)
  const { firstDayOfMonth, prevMonthDayCount, currentMonth, currentYear, events } = state;
  const numsForMonth = getDayCountForMonth(currentYear, currentMonth);

  // how many days from previous months. if -1 then 2 days
  const convertingDay = row * numOfRows + column + row - firstDayOfMonth; // 

  const currentMonthDay = convertingDay % numsForMonth + 1;
  const resetCurrentMonthIndex = currentMonth === listOfMonths.length - 1 ? 0 : currentMonth
  const nameOfMonth = !row ? listOfMonths[currentMonth] : listOfMonths[resetCurrentMonthIndex + 1]
  const resultDay = currentMonthDay < 1 ? prevMonthDayCount + currentMonthDay : currentMonthDay;
  const eventsForCurrMonth = events[nameOfMonth.toLowerCase()];
  const eventForCurrDay = eventsForCurrMonth[resultDay];

  if (eventForCurrDay && eventForCurrDay.length){
    // TODO render all events
    return eventForCurrDay[0].name
  }

  return false
  
  //return resultDay === 1 ? `${nameOfMonth.slice(0,3)} ${resultDay}` : resultDay
}


export default {
  getNewMonth, getCellDate, getCellNativeEvent, updateEventUtil
}