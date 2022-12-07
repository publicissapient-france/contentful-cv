import {auth} from "firebase-admin";
import {error} from "firebase-functions/logger";

export const getUserId = async (bearer: string | undefined) => {
  if (!bearer || !bearer.startsWith("Bearer ")) {
    return null;
  }
  try {
    const idToken = bearer.split("Bearer ")[1];
    const decodedIdToken = await auth().verifyIdToken(idToken);
    if (decodedIdToken.email) {
      return decodedIdToken.email;
    }
  } catch (e) {
    error(e);
  }
  return null;
};

export const isUserAuthorized = (userId: string) =>
  userId.endsWith("@publicissapient.com");
