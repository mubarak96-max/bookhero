const functions = require('firebase-functions');
const admin = require('firebase-admin');
const csvtojsonV2 = require('csvtojson/v2');
const path = require('path');
const os = require('os');
const fs = require('fs');

admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

//Listen to the firebase storage bucket and trigger the function when a file is uploaded
//Get the file uploaded, convert it to csv and upload each item to the firestore
exports.uploadCsvDataToFirestore = functions.storage
  .object()
  .onFinalize(async (object) => {
    const fileBucket = object.bucket;
const bucket = admin.storage().bucket(fileBucket);

    const filePath = object.name;
    const fileName = filePath.split('/').pop();
    const fileNameWithoutExtension = fileName.split('.')[0];
    const tempFilePath = path.join(os.tmpdir(), fileName);

    functions.logger.log('File name: ', fileName);
    functions.logger.log('fileBucket: ', fileBucket);
    functions.logger.log('filePath: ', filePath);
    functions.logger.log('tempFilePath: ', tempFilePath);

    //Download the file from the bucket
    
    await bucket.file(filePath).download({ destination: tempFilePath });

    try {
      if (fileName.includes('csv')) {
        csvtojsonV2()
          .fromFile(tempFilePath)
          .then((json) => {
            const collection = admin.firestore().collection('All books');
            collection
              .add(json)
              .then(() => {
                console.log('Successfully uploaded to firestore');
              })
              .catch((err) => {
                console.log(err);
              }); //end of collection.add
          })
          .catch((err) => {
            console.log(err);
          });

        return fs.unlinkSync(tempFilePath); //end of csvtojsonV2
      }
    } catch (error) {
      functions.logger.log('Error', error.message);
    }

    //end of if
  }); //end of exports.uploadToFirestore


  //Listen to the firebase storage bucket and trigger the function when a file is uploaded
  // Download the file from the bucket

  exports.downloadCsvDataFromFirestore = functions.storage
  .object()
  .onFinalize(async (object) => {
    const fileBucket = object.bucket;

