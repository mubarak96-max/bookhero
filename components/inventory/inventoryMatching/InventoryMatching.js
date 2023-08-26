import React, { useState } from "react";
import Papa from "papaparse";
import { Alert, Button, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import ScatterPlotIcon from "@mui/icons-material/ScatterPlot";
import removeDuplicatesAndCombineQuantities from "./removeDuplicatesAndCombineQuantities";
import { useDispatch, useSelector } from "react-redux";
import { setNonMatchingBooks } from "../../../utils/redux/slices/inventorySlice";
import assignSpaces from "./assignSpaces";
import processForShopify from "./processForShopify";
import InventorySpacing from "../InventorySpacing";
import getCurrentDateTime from "./getTime";
import convertFileToJson from "../../Functions/convertToJson";
import Swal from "sweetalert2";

const buttonStyle = {
  margin: "8px", // Adjust margin as needed
};

const InventoryMatching = (props) => {
  const [inventoryFile, setInventoryFile] = useState(null);
  const [scannedFiles, setScannedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadedMessage, setUploadedMessage] = useState("");

  const [processedDataURLs, setProcessedDataURLs] = useState([]);
  const [matchingDataURL, setMatchingDataURL] = useState("");
  const [noOfExisting, setNoOfExisting] = useState(null);
  const [noOfNew, setNoOfNew] = useState(null);
  const [isDownloaded, setIsDownloaded] = useState(false);

  const [disabledButtons, setDisabledButtons] = useState([]);
  const [downloadedIndices, setDownloadedIndices] = useState([]);
  const [allDownloaded, setAllDownloaded] = useState(false);

  const { allSpaces } = useSelector((state) => state.inventoryState);

  const dispatch = useDispatch();

  const onChange = (e) => {
    const newFiles = [...e.target.files];
    setScannedFiles((prevFiles) => [...prevFiles, ...newFiles]);

    e.target.value = null;
  };

  const onSubmit = async (e) => {
    //Get all the scanned files

    try {
      e.preventDefault();
      setLoading(true);

      let scannedData = [];

      console.log("scanned files", scannedFiles);

      for (const scannedFileItem of scannedFiles) {
        const currentScannedData = await convertFileToJson(scannedFileItem);

        scannedData = [...scannedData, ...currentScannedData];
      }

      const scannedArrayWithoutDuplicates =
        await removeDuplicatesAndCombineQuantities(scannedData);

      //compare inventory with scanned data

      const inventoryData = await convertFileToJson(inventoryFile);

      console.log("inventory", inventoryData);

      const matchingItems = [];
      const nonMatchingItems = [];

      scannedArrayWithoutDuplicates?.forEach((scanned) => {
        const matchingItem = inventoryData.find((inventory) => {
          const skuStart = inventory?.SKU?.indexOf("978");
          return (
            inventory?.Title?.toLowerCase() === scanned?.Title?.toLowerCase() &&
            skuStart !== -1 &&
            inventory?.SKU?.slice(skuStart) === scanned?.ISBN
          );
        });

        if (matchingItem) {
          matchingItems.push({
            Title: scanned?.Title,
            Author: scanned?.Author,
            ["Scanned Quantity"]: scanned?.Quantity,
            ["Inventory Quantity"]: Number(matchingItem["St 33 a Villa 24"]),
            SKU: matchingItem?.SKU,
            ["To be placed"]: scanned?.Quantity,
            Placed: "",
          });
        } else {
          nonMatchingItems.push({
            Title: scanned?.Title || "",
            Author: scanned?.Author || "",
            scannedQuantity: scanned?.Quantity || "",
            ISBN: scanned?.ISBN || "",
            Format: scanned?.Format,
            Tags: scanned?.Genre,
            Dimensions: scanned?.Dimensions,
            Plot: scanned?.Plot,
            PurchasePrice: scanned["Purchase Price"],
            Pages: scanned?.Pages,
          });
        }
      });

      setNonMatchingBooks(dispatch(setNonMatchingBooks(nonMatchingItems)));

      setNoOfExisting(matchingItems?.length);

      const totalBooks = nonMatchingItems.reduce(
        (acc, item) => acc + item.scannedQuantity,
        0
      );
      setNoOfNew(totalBooks);

      //get csv url for matching books

      const matchingCSV = Papa.unparse(matchingItems);
      const matching_url = URL.createObjectURL(new Blob([matchingCSV]));
      setMatchingDataURL(matching_url);

      console.log("matching", matchingItems);

      //process non matching books and give urls

      const providedWithSpace = await assignSpaces(nonMatchingItems, allSpaces);

      const processedDataForShopify = await processForShopify(
        providedWithSpace
      );

      console.log("for shopify", processedDataForShopify);

      const result = [];

      for (let i = 0; i < processedDataForShopify.length; i += 50) {
        const arr = processedDataForShopify?.slice(i, i + 50);

        const processedCSV = Papa.unparse(arr);

        const url = URL.createObjectURL(new Blob([processedCSV]));

        result.push(url);
      }

      setProcessedDataURLs(result);

      setIsDownloaded(true);

      setUploadedMessage("Files processed and ready for download.");

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const clearUploadedFiles = () => {
    setScannedFiles([]);
    // setDownloadSource("");
  };

  const finishedProcess = () => {
    setUploadedMessage("");
    setProcessedDataURLs("");
    setScannedFiles([]);
    setInventoryFile(null);
    setNoOfExisting(null);
    setNoOfNew(null);
    setIsDownloaded(false);
  };

  const finishedDownload = (index) => {
    // Update downloadedIndices with the new index
    setDownloadedIndices((prevIndices) => {
      const updatedIndices = [...prevIndices, index];

      if (updatedIndices.length === processedDataURLs.length) {
        setAllDownloaded(true);
        Swal.fire(
          "Processing complete!",
          "Files processed and ready for download",
          "success"
        );

        // The other code remains the same...
        setScannedFiles([]);
        setInventoryFile("");
        setNoOfExisting(null);
        setNoOfNew(null);
        setIsDownloaded(false);

        setTimeout(() => {
          setUploadedMessage("");
          window.location.reload();
        }, 5000);
      }

      return updatedIndices;
    });
  };

  const handleDownloadClick = (index) => {
    // Disable the clicked button by updating the disabledButtons array
    const newDisabledButtons = [...disabledButtons];
    newDisabledButtons[index] = true;
    setDisabledButtons(newDisabledButtons);

    // Call the existing finishedDownload function
    finishedDownload(index);
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 style={{ fontSize: "18px", fontWeight: "600" }}>
        Inventory Matching
      </h2>
      <div>
        <br />

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            maxWidth: "700px",
          }}
        >
          <div>
            <label>Inventory File:</label>

            <input
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              id="inventory-file"
              type="file"
              style={{ display: "none" }}
              onChange={(e) => {
                setInventoryFile(e.target.files[0]);
                e.target.value = null;
              }}
            />
            <label
              htmlFor="inventory-file"
              style={{
                marginBottom: 8,
                marginTop: 5,
                display: "block",
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
                {inventoryFile?.name} uploaded
              </Typography>
            )}
          </div>

          <div>
            <label>Scanned File:</label>

            <input
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              id="scanned-file"
              type="file"
              multiple
              style={{ display: "none" }}
              onChange={onChange}
            />
            <label
              htmlFor="scanned-file"
              style={{
                marginBottom: 8,
                marginTop: 5,
                display: "block",
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

            {scannedFiles?.length > 0 && (
              <div style={{ marginTop: "12px" }}>
                <div
                  style={{
                    marginBottom: "10px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{ fontSize: 12, marginRight: 3 }}
                    variant="subtitle1"
                  >
                    Uploaded scanned files:
                  </Typography>

                  <Button
                    size="small"
                    onClick={clearUploadedFiles}
                    color="secondary"
                    variant="outlined"
                    sx={{ paddingY: 0.1, fontSize: 9 }}
                  >
                    Clear
                  </Button>
                </div>

                <ul style={{ marginTop: "5px" }}>
                  {scannedFiles.map((file, index) => (
                    <li key={index}>{file?.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <br />

        {inventoryFile && scannedFiles?.length > 0 ? <InventorySpacing /> : ""}

        <div style={{ marginTop: "5px" }}>
          {noOfExisting > 0 && (
            <span
              style={{
                display: "block",
                fontSize: "17px",
                color: "darkblue",
                fontWeight: "600",
              }}
            >
              {noOfExisting} books need to be placed.
            </span>
          )}

          {noOfNew > 0 && (
            <span
              style={{
                display: "block",
                fontSize: "17px",
                color: "darkgreen",
                fontWeight: "600",
              }}
            >
              {noOfNew} book(s) needs to be processed.
            </span>
          )}
        </div>

        {allSpaces?.length > 0 ? (
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<ScatterPlotIcon />}
            className="upload-button"
          >
            Process Files
          </Button>
        ) : (
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<ScatterPlotIcon />}
            className="upload-button"
            disabled
          >
            Waiting for your uploads, locations and spaces
          </Button>
        )}
      </div>

      {uploadedMessage && processedDataURLs?.length > 0 && (
        <>
          <Alert
            severity="success"
            sx={{ width: "35%", marginTop: 2, fontSize: 20 }}
          >
            {uploadedMessage}
          </Alert>
        </>
      )}

      {matchingDataURL && (
        <div style={{ marginTop: "5px" }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<CloudDownloadIcon />}
            href={matchingDataURL}
            download="matchingBooks.csv"
            style={buttonStyle}
          >
            Download matching books
          </Button>
        </div>
      )}

      {true && (
        <div
        // style={{
        //   marginTop: "60px",
        // }}
        >
          {processedDataURLs?.length > 0 &&
            processedDataURLs?.map((url, index) => {
              const timestamp = getCurrentDateTime();
              console.log("time", timestamp);
              return (
                <Button
                  key={index}
                  disabled={disabledButtons[index]}
                  onClick={() => handleDownloadClick(index)}
                  variant="contained"
                  color="secondary"
                  startIcon={<CloudDownloadIcon />}
                  href={url}
                  download={`file${index + 1}.csv`}
                  style={buttonStyle}
                >
                  Download data for shopify ({index + 1})
                </Button>
              );
            })}
        </div>
      )}
    </form>
  );
};

export default InventoryMatching;
