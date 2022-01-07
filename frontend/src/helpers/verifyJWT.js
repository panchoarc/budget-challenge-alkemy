import jwtDecode from "jwt-decode";

const verifyJWT = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decoded = jwtDecode(token);
    const valid = decoded.exp < Date.now();
    return valid;
  }
  return false;
};

export { verifyJWT };
