import React, { useEffect, useState } from "react";
import useConversation from "../../zustand/useConversation.js";
import axios from "axios";
const useGetMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessage, selectedConversation } = useConversation();
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

export default useGetMessage;