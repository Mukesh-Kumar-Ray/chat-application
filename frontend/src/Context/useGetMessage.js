import React, { useEffect, useState } from "react";
import UseConversation from "../../zustand/UseConversation.js";
import axios from "axios";
const UseGetMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessage, selectedConversation } = UseConversation();
  //  console.log(selectedConversation);
  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      if (selectedConversation && selectedConversation._id) {
        try {
          //console.log("mukesh1")
          const response = await axios.get(
            `/api/message/get/${selectedConversation._id}`
          );
          //console.log("mukesh2")
          //console.log(response);
          setMessage(response.data);
          setLoading(false);
        } catch (error) {
          console.log("Error in getting messages", error);
          setLoading(false);
        }
      }
    };
    getMessages();
  }, [selectedConversation, setMessage]);
  return { loading, messages };
};

export default UseGetMessage;
