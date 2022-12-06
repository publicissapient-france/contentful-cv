import {auth} from "firebase-admin";

/** */
export class UserIdNotFoundError extends Error {
  message = "Cannot find user id";
}

export const getUserId = async (bearer: string | undefined) => {
  if (!bearer || !bearer.startsWith("Bearer ")) {
    throw new UserIdNotFoundError();
  }
  const idToken = bearer.split("Bearer ")[1];
  const decodedIdToken = await auth().verifyIdToken(idToken);

  if (!decodedIdToken.email) {
    throw new UserIdNotFoundError();
  }
  return decodedIdToken.email;
};
