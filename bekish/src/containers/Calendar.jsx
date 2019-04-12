import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import Calendar from '../components/Calendar'
import {handlePrev, handleNext, handleToday, updateEvent} from '../actions/calendar'

const mapStateToProps = (state) => {
  const {currentYear, currentMonth, firstDayOfMonth, prevMonthDayCount, events, customEvents} = state.calendarReducers;
  return {
    currentYear,
    currentMonth,
    firstDayOfMonth,
    prevMonthDayCount,
    events,
    customEvents
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ handlePrev, handleNext, handleToday, updateEvent }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar)