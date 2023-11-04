
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

export {
  parseStrapiDate
}