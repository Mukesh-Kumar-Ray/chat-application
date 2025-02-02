import React, { createContext,useState,useContext } from 'react'
import Cookies from "js-cookie";

export const AuthContext = createContext();


export const AuthProvider = ({children}) => {
    const initialUserState = Cookies.get("jwt") || localStorage.getItem("ChatApp");
    const [authUser, setAuthUser] = useState(() => {
      try {
        return initialUserState ? JSON.parse(initialUserState) : undefined;
      } catch (error) {
        console.error("Error parsing initialUserState:", error);
        return undefined;
      }
    });
  return (
    <AuthContext.Provider value={[authUser, setAuthUser]}>
       {children}
    </AuthContext.Provider>
  )
};

export const UseAuth = () => useContext(AuthContext);