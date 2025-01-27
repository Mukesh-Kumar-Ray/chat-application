import { createContext, useContext, useEffect, useState } from "react";
import { UseAuth } from "./AuthProvider";
import io from "socket.io-client";
const socketContext = createContext();

//it is a hook.
export const UseSocketContext = () => {
  return useContext(socketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [authUser] = UseAuth();

  useEffect(() => {
    if (authUser) {
      const socket = io(import.meta.env.VITE_SEVER_API , {
        query: {
          userId: authUser.user._id, /// sambhal ke bhai ._id ya id
        },
      });
      setSocket(socket);
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);
  return (
    <socketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </socketContext.Provider>
  );
};
