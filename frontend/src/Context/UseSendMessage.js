import React, { useState } from "react";
import UseConversation from "../Zustand/UseConversation.js";
import axios from "axios";
const UseSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessage, selectedConversation } = UseConversation();
  //console.log(selectedConversation);
  const sendMessages = async (message) => {
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_SEVER_API}/api/message/send/${selectedConversation._id}`,
        { message }
      );
      setMessage([...messages, res.data]);
      setLoading(false);
    } catch (error) {
      // console.log("Error in send messages", error);
      setLoading(false);
    }
  };
  return { loading, sendMessages };
};

export default UseSendMessage;
