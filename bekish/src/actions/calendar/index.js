
import { types } from '../../reducers/calendar'

// Go to prev month by changing month by -1
export const handlePrev = () => ({
  type: types.CHANGE_MONTH, data: -1
});

// Go to current month by using default value
export const handleToday = () => ({
  type: types.INIT_CALENDAR
});

// Go to next month by changing month by 1
export const handleNext = () => ({
  type: types.CHANGE_MONTH, data: 1
});

// Go to next month by changing month by 1
export const updateEvent = (data) => ({
  type: types.UPDATE_EVENT, data
});

export default {
  handlePrev, handleToday, handleNext, updateEvent
}