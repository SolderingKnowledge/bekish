import { combineReducers } from 'redux'

import calendarReducers from './calendar';

// Now we have only one reducer but we would combine other reducers from here
const reducer = combineReducers({
  calendarReducers
})

export default reducer;