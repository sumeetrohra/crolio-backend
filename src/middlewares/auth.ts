import firebase from "../firebase";

const authMiddleware = (request: any, response: any, next: any) => {
  const headerToken = request.headers.authorization;
  if (!headerToken) {
    return response.send({ message: "No token provided" }).status(401);
  }

  if (headerToken && headerToken.split(" ")[0] !== "Bearer") {
    response.send({ message: "Invalid token" }).status(401);
  }

  const token = headerToken.split(" ")[1];
  firebase
    .auth()
    .verifyIdToken(token)
    .then((data) => {
      response.locals.uid = data.uid;
      request.uid = data.uid;
      next();
    })
    .catch(() => response.send({ message: "Could not authorize" }).status(403));
};

export default authMiddleware;
