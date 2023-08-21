import React, { useState } from "react";
import Papa from "papaparse";
import { Button, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

const buttonStyle = {
  margin: "8px", // Adjust margin as needed
};

const Upload = (props) => {
  const [inventoryFile, setInventoryFile] = useState(null);
  const [scannedFile, setScannedFile] = useState(null);
  const [matchingCSVUrl, setMatchingCSVUrl] = useState("");
  const [nonMatchingCSVUrl, setNonMatchingCSVUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadedMessage, setUploadedMessage] = useState("");

  const csvToJson = async (file) => {
    const parseFile = () => {
      return new Promise((resolve) => {
        Papa.parse(file, {
          header: true,
          complete: (results) => {
            resolve(results.data);
          },
        });
      });
    };
    let parsedData = await parseFile();

    return parsedData;
  };

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      const inventoryData = await csvToJson(inventoryFile);
      const scannedData = await csvToJson(scannedFile);

      const matchingRows = [];
      const nonMatchingScanned = [];

      scannedData.forEach((scannedRow) => {
        console.log(scannedRow?.title);
        const matchedRow = inventoryData.find((inventoryRow) => {
          console.log(
            inventoryRow.Title?.toLowerCase() ===
              scannedRow?.Title?.toLowerCase()
          );

          if (
            inventoryRow.Title?.toLowerCase() ===
            scannedRow?.Title?.toLowerCase()
          ) {
            console.log(inventoryRow);
          }

          return (
            inventoryRow.Title?.toLowerCase() ===
            scannedRow?.Title?.toLowerCase()
          );
        });

        if (matchedRow) {
          matchingRows.push({
            Placed: "",
            InvetoryAdded: "",
            Title: matchedRow?.Title,
            Author: scannedRow?.Author,
            SKU: matchedRow["Variant SKU"],
          });
        } else {
          nonMatchingScanned.push(scannedRow);
        }
      });

      const matchingCSV = Papa.unparse(matchingRows);
      const nonMatchingCSV = Papa.unparse(nonMatchingScanned);

      setMatchingCSVUrl(URL.createObjectURL(new Blob([matchingCSV])));
      setNonMatchingCSVUrl(URL.createObjectURL(new Blob([nonMatchingCSV])));

      setUploadedMessage("Files uploaded successfully.");
      setInventoryFile(null);
      setScannedFile(null);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>Inventory File:</label>
        {/* <input
          type="file"
          onChange={(e) => setInventoryFile(e.target.files[0])}
        /> */}

        <input
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          id="inventory-file"
          type="file"
          style={{ display: "none" }}
          onChange={(e) => setInventoryFile(e.target.files[0])}
        />
        <label
          htmlFor="inventory-file"
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
            Upload Inventory File
          </Button>
        </label>

        {inventoryFile && (
          <Typography variant="body2" color="textSecondary">
            {inventoryFile.name} uploaded
          </Typography>
        )}

        <br />
        <label>Scanned File:</label>
        {/* <input
          type="file"
          onChange={(e) => setScannedFile(e.target.files[0])}
        /> */}

        <input
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          id="scanned-file"
          type="file"
          style={{ display: "none" }}
          onChange={(e) => setScannedFile(e.target.files[0])}
        />
        <label
          htmlFor="scanned-file"
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
            Upload Scanned File
          </Button>
        </label>

        {scannedFile && (
          <Typography variant="body2" color="textSecondary">
            {scannedFile.name} uploaded
          </Typography>
        )}

        <br />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          startIcon={<CloudUploadIcon />}
          className="upload-button"
        >
          Upload
        </Button>
      </div>

      {!loading && matchingCSVUrl && nonMatchingCSVUrl && (
        <div
          style={{
            marginTop: "60px",
          }}
        >
          {/* <a href={matchingCSVUrl} download="matching.csv">
            Download Matching
          </a> */}

          <Button
            variant="contained"
            color="primary"
            startIcon={<CloudDownloadIcon />}
            href={matchingCSVUrl}
            download="matching.csv"
            style={buttonStyle}
          >
            Download Matching
          </Button>

          <br />
          {/* <a href={nonMatchingCSVUrl} download="non-matching.csv">
            Download Non-Matching
          </a> */}

          <Button
            variant="contained"
            color="secondary"
            startIcon={<CloudDownloadIcon />}
            href={nonMatchingCSVUrl}
            download="non-matching.csv"
            style={buttonStyle}
          >
            Download Non-Matching
          </Button>
        </div>
      )}

      {uploadedMessage && (
        <Typography variant="body2" color="textSecondary">
          {uploadedMessage}
        </Typography>
      )}
    </form>
  );
};

export default Upload;
