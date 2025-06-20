import { get, reject } from "lodash";
import moment from "moment/moment";
import { createSelector } from "reselect";

// Selectors
const allData = (state) => get(state, "medical.allMedical.data", []);
const deleteData = (state) => get(state, "medical.deleteMedical.data", []);
const account = (state) => get(state, "provider.account");
const events = (state) => get(state, "medical.events");

// Filter out deleted records
const openData = (state) => {
  const all = allData(state);
  const delet = deleteData(state);

  const openData = reject(all, (data) => {
    if (!data || !data.recordId) return true; // skip undefined or bad records
    return delet.some(
      (o) =>
        o?.recordId?.toString() === data?.recordId?.toString()
    );
  });

  return openData;
};

// Selector to get only non-deleted records and decorate them
export const dataBookSelector = createSelector(openData, (data) => {
  return decorateOpenData(data);
});

// Safe mapping with decorator
const decorateOpenData = (datas) => {
  return datas
    .filter((data) => data !== undefined && data.recordId !== undefined)
    .map((data) => decorateOrder(data));
};

// Format a single record
export const decorateOrder = (data) => {
  if (!data || data.recordId === undefined) return {};

  const precision = 100000;
  let recordIdNew = Math.round(data.recordId * precision) / precision;
  let ageNew = Math.round(data.age * precision) / precision;

  return {
    ...data,
    recordIdNew,
    ageNew,
    formattedTimestamp: moment
      .unix(data.timestamp || 0)
      .format("h:mm:ssa d MMM yyyy"),
  };
};

// Get all blockchain events (optional: filter by account if needed)
export const myEventsSelector = createSelector(
  account,
  events,
  (account, events) => {
    return events || [];
  }
);
