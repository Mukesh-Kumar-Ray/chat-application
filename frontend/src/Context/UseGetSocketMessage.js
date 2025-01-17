import React, { useEffect } from "react";
import { UseSocketContext } from "./SocketContext.jsx";
import UseConversation from "../Zustand/UseConversation.js";
import sound from "../assets/soundpop.mp3";
const UseGetSocketMessage = () => {
  const { socket } = UseSocketContext();
  const { messages, setMessage } = UseConversation();

  useEffect(() => {
    socket.on("newMessage", (newMessage) => {
      const notification = new Audio(sound);
      notification.play();
      setMessage([...messages, newMessage]);
    });
    return () => {
      socket.off("newMessage");
    };
  }, [socket, messages, setMessage]);
};
export default UseGetSocketMessage;
