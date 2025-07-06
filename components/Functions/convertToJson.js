import * as XLSX from "xlsx";

const convertFileToJson = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      let workbook;
      if (file.name.endsWith(".csv")) {
        workbook = XLSX.read(data, { type: "array", raw: true });
      } else {
        workbook = XLSX.read(data, { type: "array" });
      }
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const json = XLSX.utils.sheet_to_json(worksheet);
      resolve(json);
    };
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};

export default convertFileToJson;
