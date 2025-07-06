import React, { useState } from "react";
import Papa from "papaparse";
import { Button, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import ScatterPlotIcon from "@mui/icons-material/ScatterPlot";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import SpaceInput from "./inventoryTodo/SpaceInput";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const InventorySpacing = () => {
  const [spacedFile, setSpacedFile] = useState([]);
  const [spaces, setSpaces] = useState([]);

  const { nonMatchingBooks, allSpaces } = useSelector(
    (state) => state.inventoryState
  );

  const onChange = (e) => {
    // setFiles(e.target.files);

    const newFiles = [...e.target.files];
    setSpacedFile((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const clearUploadedFiles = () => {
    setSpacedFile([]);
    // setDownloadSource("");
  };

  // const getSpaces = async () => {
  //   try {
  //     e.preventDefault();
  //     setLoading(true);

  //     const unplacedItems = await csvToJson(unplacedFile); // Load unplaced items from CSV

  //     const locatedItems = [];
  //     const remainingItems = [];

  //     for (const item of unplacedItems) {
  //       const matchedSpace = availableSpaces.find(
  //         (space) => !space.tc && parseInt(space.amount) > 0
  //       );

  //       if (matchedSpace) {
  //         locatedItems.push({
  //           Placed: matchedSpace.location,
  //           InvetoryAdded: "",
  //           Title: item.Title,
  //           Author: item.Author,
  //           SKU: matchedSpace.id,
  //         });

  //         matchedSpace.amount = (parseInt(matchedSpace.amount) - 1).toString();
  //       } else {
  //         remainingItems.push(item);
  //       }
  //     }

  //     const locatedCSV = Papa.unparse(locatedItems);
  //     const remainingCSV = Papa.unparse(remainingItems);

  //     setLocatedCSVUrl(URL.createObjectURL(new Blob([locatedCSV])));
  //     setRemainingCSVUrl(URL.createObjectURL(new Blob([remainingCSV])));

  //     setUploadedMessage("Files uploaded successfully.");
  //     setUnplacedFile(null);

  //     setLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        marginBottom: "20px",
        border: "1px solid grey",
        width: "900px",
        paddingLeft: "30px",
        paddingBottom: "20px",
        borderRadius: "8px",
      }}
    >
      <h2 style={{ fontSize: "15px", fontWeight: "600", color: "grey" }}>
        Please provide the locations available in the shelves and the number of
        spaces to be filled below
      </h2>

      <SpaceInput setSpaces={setSpaces} />

      <div>
        {spacedFile?.length > 0 && (
          <div style={{ marginTop: "12px" }}>
            <ul style={{ marginTop: "5px" }}>
              {spacedFile.map((file, index) => (
                <li key={index}>{file?.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default InventorySpacing;
