import { createContext, useReducer } from "react";

const AuthContext = createContext();

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const initialState = {
  user: null,
  isAuthenticate: false,
};
function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, isAuthenticate: true, user: action.payload };

    case "logout":
      return { ...state, isAuthenticate: false, user: null };

    default:
      throw new Error("unknown action");
  }
}
function AuthContextProvider({ children }) {
  const [{ user, isAuthenticate }, dispatch] = useReducer(
    reducer,
    initialState
  );
  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  }
  function logout() {
    dispatch({ type: "logout" });
  }
  return (
    <AuthContext.Provider value={(user, isAuthenticate, login, logout)}>
      {children}
    </AuthContext.Provider>
  );
}
export { AuthContext, AuthContextProvider };
