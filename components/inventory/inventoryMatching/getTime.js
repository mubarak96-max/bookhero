export function getFormattedDate() {
  let currentDate = new Date();

  let day = currentDate.getDate();
  let month = currentDate.getMonth() + 1; // Months are zero-based.
  let year = currentDate.getFullYear();

  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  let ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;

  return `${day}-${month}-${year}-${hours}:${minutes}${ampm}`;
}
