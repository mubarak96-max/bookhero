//React component that that has an input field for files and a button to upload the file.
import React, { useState } from "react";
import arrayToCSV from "../Functions/arrayToCSV";
import findTagsDuplicates from "../Functions/findTagsDuplicates";
import csvToJson from "../Functions/CsvToJson";
import { Button, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
// import { LoadingButton } from '@mui/lab';
// import { SaveIcon } from '@mui/icons-material';

const Upload = (props) => {
  const [files, setFiles] = useState([]);
  const [downloadSource, setDownloadSource] = useState("");

  const onChange = (e) => {
    // setFiles(e.target.files);

    const newFiles = Array.from(e.target.files); 
    setFiles([...files, ...newFiles]);
  };

  const [loading, setLoading] = useState(false);

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

    const final = findTagsDuplicates(finalArray);

    const url = arrayToCSV(final, "All tags.csv");

    setDownloadSource(url);
    setLoading(false);
  };

  console.log("files", files);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        marginTop: "100px",
        height: "40vh",
      }}
    >
      <form onSubmit={onSubmit}>
        <div>
          {/* <input type='file' multiple onChange={onChange} />
          <button type='submit'>Upload</button> */}

          <label>Check Tags:</label>

          <input
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            id="tag-files"
            type="file"
            style={{ display: "none" }}
            multiple
            onChange={onChange}
          />
          <label
            htmlFor="tag-files"
            style={{
              marginBottom: 8,
              marginTop: 5,
              display: "block", // Ensure the label takes up full width
            }}
          >
            <Button
              variant="outlined"
              component="span"
              startIcon={<CloudUploadIcon />}
              sx={{ marginLeft: 2 }}
            >
              Upload Tag File(s)
            </Button>
          </label>
          {/* 
          {files && (
            <>
              {files?.length === 1 ? (
                <Typography variant="body2" color="textSecondary">
                  {files[0].name} uploaded
                </Typography>
              ) : (
                files?.map((file) => (
                  <Typography variant="body2" color="textSecondary">
                    {file.name} uploaded
                  </Typography>
                ))
              )}
            </>
          )} */}

          {files.length > 0 && (
            <div>
              {files?.map((file, index) => (
                <Typography key={index} variant="body2" color="textSecondary">
                  {file.name} uploaded
                </Typography>
              ))}
            </div>
          )}
        </div>

        {downloadSource && (
          <div
            style={{
              marginTop: "60px",
            }}
          >
            {/* <a
              href={downloadSource}
              download
              style={{
                backgroundColor: "DodgerBlue",
                border: "none",
                color: "white",
                padding: "12px 30px",
                cursor: "pointer",
                fontSize: "20px",
                marginTop: "60px",
              }}
            >
              Download
            </a> */}

            <Button
              variant="contained"
              onClick={() => window.open(downloadSource, "_blank")}
              style={{
                backgroundColor: "DodgerBlue",
                color: "white",
                padding: "12px 30px",
                cursor: "pointer",
                fontSize: "20px",
                marginTop: "60px",
              }}
            >
              Download
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Upload;
