import Papa from 'papaparse';

const csvToJson = async (fileToConvert, fileName) => {
  const parseFile = () => {
    return new Promise((resolve) => {
      Papa.parse(fileToConvert, {
        header: true,
        complete: (results) => {
          resolve(results.data);
        },
      });
    });
  };
  let parsedData = await parseFile();
  for (let i = 0; i < parsedData.length; i++) {
    if (parsedData[i].Title !== '') {
      parsedData[i].location = fileName;
    }
  }
  return parsedData;
};

export default csvToJson;
