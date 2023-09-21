import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";

const Upload = ({ getUploadedBookInfo, getBlob }) => {
  const [uploadError, setUploadError] = useState(null);
  const [tittle, setTittle] = useState("");
  const [image, setImage] = useState("");
  const [author, setAuthor] = useState("");
  const [Isbn, setISBN] = useState("");
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles) => {
      getBlob(URL.createObjectURL(acceptedFiles[0]));
      setImage(acceptedFiles[0]);
    },
    [getBlob]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleUpload = async (e) => {
    e.preventDefault();
    setUploading(true);
    setUploadError(null);

    try {
      const { url } = await fetch("/api/authaws").then((res) => res.json());
      console.log(url, image);
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "image/jpg"
        },
        body: image
      });

      console.log("response", response);

      if (response.status === 200) {
        const imageUrl = url.split("?")[0];

        console.log(imageUrl, "image");

        const bookInformation = {
          imageLink: imageUrl,
          bookISBN: Isbn,
          bookTittle: tittle,
          bookAuthor: author
        };

        setAuthor("");
        setISBN("");
        setTittle("");
        setImage("");

        const sendToDatabase = await axios.post(
          "/api/bookdata/addbook",
          bookInformation
        );

        // console.log('data', sendToDatabase?.data);

        getUploadedBookInfo(sendToDatabase.data?.bookDatacreated);
      } else {
        throw new Error("Failed to upload image");
      }
    } catch (error) {
      console.log(error.message);
      setUploadError(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <TextField
        id="outlined-basic"
        label="Tittle"
        variant="outlined"
        value={tittle}
        onChange={(e) => {
          setTittle(e.target.value);
        }}
      />
      <br /> <br />
      <br />
      <br />
      <div
        {...getRootProps()}
        style={{
          border: "2px dotted blue",
          height: "100px",
          maxWidth: "250px",
          textAlign: "center"
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the Image here ...</p>
        ) : (
          <p>Drag and drop image here, or click to select image</p>
        )}
      </div>
      <br />
      <br />
      {tittle && image && (
        <>
          <LoadingButton
            color="primary"
            onClick={handleUpload}
            loading={uploading}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="contained"
          >
            {uploading ? "Uploading...." : "Confirm Upload"}
          </LoadingButton>
        </>
      )}
      {uploadError && (
        <h2>
          Upload Error, Reload the page and try again, if it persists contact
          Jafari
        </h2>
      )}
    </>
  );
};

export default Upload;
