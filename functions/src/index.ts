import * as functions from "firebase-functions";
import {initializeApp} from "firebase-admin/app";
import * as cors from "cors";
import {getUserId, isUserAuthorized} from "./auth";
import {getCv} from "./cv";

const corsHandler = cors({origin: true});

initializeApp();

// noinspection JSUnusedGlobalSymbols
export const fcv = functions
    .region("europe-central2")
    .https.onRequest((request, response) => {
      corsHandler(request, response, async () => {
        const userId = await getUserId(request.get("Authorization"));
        const locale = (request.query.locale || "fr") as string;
        if (!userId || !isUserAuthorized(userId)) {
          response.sendStatus(403);
          return;
        }
        const cv = await getCv(userId, locale);
        response.status(200).send(cv);
      });
    });
