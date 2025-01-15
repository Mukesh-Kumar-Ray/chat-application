import React, { createContext,useState,useContext } from 'react'
import Cookies from "js-cookie";

export const AuthContext = createContext();


export const AuthProvider = ({children}) => {
    const initialUserState = Cookies.get("jwt") || localStorage.getItem("ChatApp");
    const [authUser, setAuthUser] = useState(initialUserState ? JSON.parse(initialUserState) : undefined);
    console.log(authUser);
  return (
    <AuthContext.Provider value={[authUser, setAuthUser]}>
       {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);