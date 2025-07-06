import Papa from 'papaparse';

//A function that use papaparse to convert an array to a CSV file
function arrayToCSV(array, filename) {
  var csv = Papa.unparse(array);
  var csvData = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

  const csvFile = window.URL.createObjectURL(csvData);
  // returns a URL you can use as a href
  return csvFile;
}

export default arrayToCSV;
