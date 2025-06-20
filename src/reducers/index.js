import { combineReducers } from 'redux';
import records from './records';
// ... other reducers

export default combineReducers({
  records,
  // ... other state slices
});
