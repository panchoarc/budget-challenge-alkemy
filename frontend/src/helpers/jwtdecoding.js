import jwt_decode from "jwt-decode";

const retrieveUserData = (token) => {
  const decoded = jwt_decode(token);
  return {
    id: decoded.userId,
    email: decoded.email,
    name: decoded.name,
  };
};

const verifyValidToken = (token) => {
  const decoded = jwt_decode(token);
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    return false;
  }
  return true;
};

export { retrieveUserData, verifyValidToken };
