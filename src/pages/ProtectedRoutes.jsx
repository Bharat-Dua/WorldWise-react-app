// import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import useFakeAuth from "../hooks/useFakeAuth";
// import { useEffect } from "react";

function ProtectedRoutes({ children }) {
  const { isAuthenticated } = useFakeAuth();
  //   const navigate = useNavigate();
  //   useEffect(() => {
  //     if (!isAuthenticated) navigate("/");
  //   }, [isAuthenticated, navigate]);
  if (!isAuthenticated) return <Navigate to="/" />;

  //   return isAuthenticated?children:null;
  return children;
}

export default ProtectedRoutes;
