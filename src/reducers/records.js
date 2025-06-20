// src/reducers/records.js

const initialState = {
  loaded: false,
  data: [],
};

const records = (state = initialState, action) => {
  switch (action.type) {
    case 'RECORDS_LOADED':
      return {
        ...state,
        loaded: true,
        data: action.records,
      };

    case 'RECORD_ADDED':
      if (!action.record || !action.record.recordId) {
        console.warn("Invalid record in action payload:", action.record);
        return state;
      }

      // Check for duplicates before adding
      const exists = state.data.find(
        (record) => record.recordId === action.record.recordId
      );

      if (exists) return state;

      return {
        ...state,
        data: [...state.data, action.record],
      };

    default:
      return state;
  }
};

export default records;
