import * as functions from "firebase-functions";

export const helloWorld = functions
    .region("europe-central2")
    .https.onRequest((request, response) => {
      functions.logger.info("Hello logs!", {structuredData: true});
      response.send("Hello from Firebase!");
    });
