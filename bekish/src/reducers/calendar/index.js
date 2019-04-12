import { getNewMonth, updateEventUtil } from '../../utils'
import nativeEvents from '../../db/events'

export const types = {
  INIT_CALENDAR: 'INIT_CALENDAR',
  CHANGE_MONTH: 'CHANGE_MONTH',
  UPDATE_EVENT: 'UPDATE_EVENT'
}

const {currentYear, currentMonth, firstDayOfMonth, prevMonthDayCount} = getNewMonth()
export const initialState = {
  currentYear,
  currentMonth,
  firstDayOfMonth,
  prevMonthDayCount,
  events: nativeEvents,
  customEvents: nativeEvents,
}

export default (state = initialState, action) => {
  switch(action.type) {

    // Change month with given date => -1 or 1 determines decrease or increase
    case types.CHANGE_MONTH:
      return getNewMonth(state, action.data)
    
    // Init calendar with current date
    case types.INIT_CALENDAR:
      return getNewMonth()
    
    // Init calendar with current date
    case types.UPDATE_EVENT:
      return {
        ...state,
        customEvents: updateEventUtil(state.customEvents, action.data )
      }
    
    // Init calendar with current date
    default:
      return state
  }
}