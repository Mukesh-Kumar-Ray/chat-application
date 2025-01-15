import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../../Context/useSendMessage.js";

function Typesend() {
  const [message, setMessage] = useState("");
  const { loading, sendMessages } = useSendMessage();

  const handleSubmit = async (e) => {
    //console.log(e);
    e.preventDefault();
    await sendMessages(message);
    setMessage("");
  };

  return (
    <form className="w-full" onSubmit={handleSubmit} >
  <div className="flex items-center space-x-3 h-[8vh] bg-gray-800 p-2 rounded-lg shadow-lg">
    <div className="w-full">
      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border border-gray-600 bg-gray-700 text-white rounded-lg outline-none px-4 py-2 w-full placeholder-gray-400 focus:border-blue-500"
      />
    </div>
    <button
      type="submit"
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center transition duration-300"
    >
      <IoSend className="text-2xl" />
    </button>
  </div>
</form>

  )
}

export default Typesend