/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from "react";
const initialState = {
  user: null,
  isAuthenticated: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payLoad,
        isAuthenticated: true,
      };
    case "logout":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      throw new Error("Invalid action type!!!");
  }
};

const FAKE_USER = {
  name: "Ragav",
  email: "ragav@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const AuthProvider = createContext();

function AuthContext({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const logIn = (email, password) => {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payLoad: FAKE_USER });
  };

  const logOut = () => {
    dispatch({ type: "logout" });
  };

  return (
    <AuthProvider.Provider value={{ user, isAuthenticated, logIn, logOut }}>
      {children}
    </AuthProvider.Provider>
  );
}

function useAuth() {
  const auth = useContext(AuthProvider);
  if (auth === undefined) throw new Error("out of Scope");
  return auth;
}

export { AuthContext, useAuth };
