import React from 'react'
import Left from "./Home/Leftpart/Left"
import Right from "./Home/Rightpart/Right"
import { Navigate,Route,Routes } from 'react-router'
import Signup from './Components/Signup'
import Login from './Components/Login'
import { useAuth } from "./Context/AuthProvider";

const App = () => {
  const [authUser, setAuthUser] = useAuth();
  //console.log(authUser );
  return (
    <>
    <Routes>
      <Route
        path="/"
        element={
          authUser ? (
            <div className="flex h-screen">
              <Left />
              <Right />
            </div>
            
          ) : (
            <Navigate to={"/login"} />
          )
        }
      />
      <Route
        path="/login"
        element={authUser ? <Navigate to="/" /> : <Login />}
      />
      <Route
        path="/signup"
        element={authUser ? <Navigate to="/" /> : <Signup />}
      />
    </Routes>
  </>

  )
}

export default App