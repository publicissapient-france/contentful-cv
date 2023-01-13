import * as functions from "firebase-functions";
import {initializeApp} from "firebase-admin/app";
import * as cors from "cors";
import {getUserId, isUserAuthorized} from "./auth";
import {getCv} from "./cv";
import {getCvUpdates} from "./cvUpdates";

const corsHandler = cors({origin: true});

initializeApp();

// noinspection JSUnusedGlobalSymbols
export const fcv = functions
    .region("europe-central2")
    .https.onRequest((request, response) => {
      corsHandler(request, response, async () => {
        const userId = await getUserId(request.get("Authorization"));
        if (!userId || !isUserAuthorized(userId)) {
          response.sendStatus(403);
          return;
        }

        const locale = (request.query.locale || "fr") as string;
        const id = request.path.split("/")[1];
        const cv = await getCv(id, locale);

        response.status(200).send(cv);
      });
    });

export const fcvUpdates = functions
    .region("europe-central2")
    .https.onRequest((request, response) => {
      corsHandler(request, response, async () => {
        const userId = await getUserId(request.get("Authorization"));
        if (!userId || !isUserAuthorized(userId)) {
          response.sendStatus(403);
          return;
        }

        const users = await getCvUpdates();

        response.status(200).send(users);
      });
    });
