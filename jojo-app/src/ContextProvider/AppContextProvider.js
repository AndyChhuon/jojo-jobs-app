import React, { createContext } from "react";

const userLogin = createContext();

export default function AppContextProvider(props) {
  const { children, value } = props;
  return <userLogin.Provider value={value}>{children}</userLogin.Provider>;
}

export { userLogin };
