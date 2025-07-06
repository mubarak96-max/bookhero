//React component that that has an input field for files and a button to upload the file.

import React, { useState } from "react";
import arrayToCSV from "../Functions/arrayToCSV";
import findDuplicates from "../Functions/findDuplicates";
import csvToJson from "../Functions/CsvToJson";
import { Button, Input, Typography } from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
// import { LoadingButton } from '@mui/lab';
// import { SaveIcon } from '@mui/icons-material';

const Upload = (props) => {
  const [files, setFiles] = useState("");
  const [downloadSource, setDownloadSource] = useState("");

  const onChange = (e) => {
    // setFiles(e.target.files);

    const newFiles = [...e.target.files];
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let completeConvertedArray = [];

    for (let i = 0; i < files.length; i++) {
      const filename = files[i].name.split(".")[0];

      const csvs = await csvToJson(files[i], filename);

      completeConvertedArray.push(csvs);
    }

    //Make the array of arrays into one array
    const finalArray = [].concat.apply([], completeConvertedArray);

    const final = findDuplicates(finalArray);

    const url = arrayToCSV(final, "duplicates.csv");

    setDownloadSource(url);
    setLoading(false);
  };

  const clearUploadedFiles = () => {
    setFiles([]);
    setDownloadSource("");
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <Input
          type="file"
          inputProps={{ multiple: true }}
          onChange={onChange}
        />

        {files.length > 0 && (
          <div style={{ marginTop: "8px" }}>
            <Button
              sx={{ marginRight: 2 }}
              size="small"
              type="submit"
              variant="contained"
            >
              Upload
            </Button>

            <Button
              size="small"
              onClick={clearUploadedFiles}
              color="secondary"
              variant="outlined"
            >
              Clear
            </Button>
          </div>
        )}
      </div>

      {files.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <Typography variant="subtitle1">Uploaded Files:</Typography>
          <ul>
            {files.map((file, index) => (
              <li key={index}>{file?.name}</li>
            ))}
          </ul>
        </div>
      )}

      {downloadSource && (
        <div style={{ marginTop: "20px" }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<CloudDownloadIcon />}
            href={downloadSource}
            download="similars.csv"
          >
            Download
          </Button>
        </div>
      )}

      {/* <div>
        <input type='file' multiple onChange={onChange} />
        <button type='submit'>Upload</button>
      </div> */}

      {/* {downloadSource && (
        <div
          style={{
            marginTop: '60px',
          }}>
          <a
            href={downloadSource}
            download
            style={{
              backgroundColor: 'DodgerBlue',
              border: 'none',
              color: 'white',
              padding: '12px 30px',
              cursor: 'pointer',
              fontSize: '20px',
              marginTop: '60px',
            }}>
            Download
          </a>
        </div>
      )} */}
    </form>
  );
};

export default Upload;
