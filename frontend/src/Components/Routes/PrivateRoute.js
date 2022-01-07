import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { verifyJWT } from "../../helpers/verifyJWT";

const PrivateRoute = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const valid = verifyJWT();

  return valid && isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
