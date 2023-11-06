import { MONTH_NAMES } from "@/common";

function parseStrapiDate(date: string) {
  // Create a new Date object from the input string
  var dateObject = new Date(date);

  var day = dateObject.getUTCDate();
  var month = dateObject.getUTCMonth() + 1;
  var year = dateObject.getUTCFullYear();

  // Add leading zeros if day or month is a single digit
  let _day = day < 10 ? "0" + day : day;
  let _month = month < 10 ? "0" + month : month;

  return _day + "-" + _month + "-" + year;
}

function parseDatestamp(timestamp: string) {
  const dateObj = new Date(timestamp);
  const date = dateObj.getDate().toString();
  // adding 1 to get the actual month, as Jan-Dec is indexed from 0-11
  const month = MONTH_NAMES[dateObj.getMonth()] ?? "";
  const year = dateObj.getFullYear().toString();

  return { date, month, year };
}

function sortScheduleTimelineCollection(data: Array<ScheduleInterface>) {
  return data.sort(
    (a, b) =>
      new Date(a.datestamp.mainTimestamp).getTime() -
      new Date(b.datestamp.mainTimestamp).getTime(),
  );
}

function parseTimestampToHHMM(timestamp: string) {
  const date = new Date(timestamp);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

function convertToRFC5545Timestamp(timestamp: string) {
  const dateObj = new Date(timestamp);
  const year = dateObj.getUTCFullYear();
  const month = String(dateObj.getUTCMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getUTCDate()).padStart(2, "0");
  const hours = String(dateObj.getUTCHours()).padStart(2, "0");
  const minutes = String(dateObj.getUTCMinutes()).padStart(2, "0");
  const seconds = String(dateObj.getUTCSeconds()).padStart(2, "0");

  return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
}

export {
  parseStrapiDate,
  parseDatestamp,
  sortScheduleTimelineCollection,
  parseTimestampToHHMM,
  convertToRFC5545Timestamp,
};
