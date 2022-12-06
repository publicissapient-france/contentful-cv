import * as functions from "firebase-functions";
import {initializeApp} from "firebase-admin/app";
import {getUserId, UserIdNotFoundError} from "./auth";

initializeApp();

// noinspection JSUnusedGlobalSymbols
export const cv = functions
    .region("europe-central2")
    .https.onRequest(async (request, response) => {
      try {
        const userId = await getUserId(request.get("Authorization"));
        response.status(200).send(userId);
      } catch (e) {
        if (e instanceof UserIdNotFoundError) {
          functions.logger.info(e, {structuredData: true});
        } else {
          functions.logger.warn(e, {structuredData: true});
        }
        response.sendStatus(401);
      }
    });
