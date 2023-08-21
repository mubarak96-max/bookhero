import React from "react";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Button } from "@mui/material";

const BookShowComponent = (props) => {
  const { imageLink, bookTittle, bookAuthor, bookISBN } = props.book;

  const copyToClipboard = () => {
    /* Copy the text inside the text field */
    navigator.clipboard.writeText(imageLink);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <div className={styles.card}>
        <div>
          <strong>Book Info</strong>
        </div>
        <div>
          <p>
            Tittle: <strong>{bookTittle} </strong>
          </p>
          <p>
            Author: <strong>{bookAuthor}</strong>
          </p>
          <p>
            ISBN: <strong>{bookISBN} </strong>
          </p>
          <br />

          <Button
            variant="contained"
            component="span"
            onClick={copyToClipboard}
          >
            Copy image Link
          </Button>
        </div>
      </div>
      <div className={styles.card}>
        <h2>Uploaded Image &rarr;</h2>
        <Image width={200} height={200} src={imageLink} alt="Image uploaded" />
      </div>
    </div>
  );
};

export default BookShowComponent;
