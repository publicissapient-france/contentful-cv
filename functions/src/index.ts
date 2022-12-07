import * as functions from "firebase-functions";
import {initializeApp} from "firebase-admin/app";
import {getUserId, isUserAuthorized} from "./auth";

initializeApp();

// noinspection JSUnusedGlobalSymbols
export const cv = functions
    .region("europe-central2")
    .https.onRequest(async (request, response) => {
      const userId = await getUserId(request.get("Authorization"));
      if (!userId || !isUserAuthorized(userId)) {
        response.sendStatus(403);
        return;
      }
      response.status(200).send(userId);
    });
