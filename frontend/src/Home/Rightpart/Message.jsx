import React from "react";

function Message({ message }) {
  //console.log(message);
  const authUser = JSON.parse(localStorage.getItem("ChatApp"));
  //console.log(authUser);
  const itsMe = message.senderId === authUser.user._id;
  //console.log(itsMe);
  const messageClasses = itsMe
    ? "ml-auto bg-green-100 rounded-tl-xl rounded-tr-xl rounded-bl-xl" // Sender message
    : "mr-auto bg-white rounded-tr-xl rounded-tl-xl rounded-br-xl" ; // Receiver message

  const createdAt = new Date(message.createdAt);
  const formattedTime = createdAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="flex flex-col w-full p-2">
      <div
        className={`max-w-[80%] px-4 py-2 shadow-sm ${messageClasses}`}
      >
        <div className="text-gray-800">{message.message}</div>
        <div className="text-xs text-gray-500 mt-1 text-right">
          {formattedTime}
        </div>
      </div>
    </div>
  );
}

export default Message;