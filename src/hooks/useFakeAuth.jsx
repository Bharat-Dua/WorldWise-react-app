import { useContext } from "react";
import { AuthContext } from "../context/FakeAuthContext";

function useFakeAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthContext must be used within a AuthContextProvider");
  }
  return context;
}
export default useFakeAuth;
