import moment from 'moment';
import duration from 'moment';

export function dateStringToISO(date) {
  if (date === "")
    return null;
  return moment(date, "DD/MM/YYYY hh:mm a").toISOString();
}

export function isoToDateString(iso) {
  return moment(iso).format("dddd, MMMM Do YYYY, h:mm:ss a");
}

export function epochToISO(epoch) {
  return moment(new Date(epoch)).format("DD/MM/YYYY hh:mm a");
}

export function capitalizeFirst(string) {
  return `${string[0].toUpperCase()}${string.slice(1)}`;
}

export function multipleSelectedOptions(selectedOptions) {
  return [].slice.call(selectedOptions).map((option) => option.value);
}

export function getDefaultEffectiveFrom() {
  return moment(new Date()).format("DD/MM/YYYY") + ' 12:00 am';
}

export function getDefaultEffectiveTo() {
  return moment(new Date()).add(5, 'years').format("DD/MM/YYYY") + ' 12:00 am';
}
