import * as functions from "firebase-functions";
import {initializeApp} from "firebase-admin/app";
import {getUserId, isUserAuthorized} from "./auth";
import {getCv} from "./cv";

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
      const cv = await getCv(userId);
      response.status(200).send(cv);
    });
