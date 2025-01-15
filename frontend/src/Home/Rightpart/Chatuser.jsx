import React from "react";
import { CiMenuFries } from "react-icons/ci";
import useConversation from "../../../zustand/useConversation.js";
import { useSocketContext } from "../../Context/SocketContext.jsx";

function Chatuser() {
  const { selectedConversation } = useConversation();

  //console.log(selectedConversation);

  const { onlineUsers } = useSocketContext();
  console.log(onlineUsers);
  const getOnlineUsersStatus = (userId) => {
    return onlineUsers.includes(userId) ? "Online" : "Offline";
  };
  return (
    <div className="relative flex items-center h-[8%] bg-slate-800 hover:bg-slate-700 duration-300 rounded-md shadow-md px-4">
      {/* Drawer Toggle Button (Mobile) */}
      <label
        htmlFor="my-drawer-2"
        className="lg:hidden absolute left-4 cursor-pointer"
        aria-label="Open Menu"
      >
        <CiMenuFries className="text-white text-2xl hover:text-gray-300 duration-200" />
      </label>

      {/* Conversation Header */}
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-700">
          <img
            src="https://via.placeholder.com/56"
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Conversation Details */}
        <div>
          <h1 className="text-lg font-semibold text-white leading-tight">
            {selectedConversation.fullname}
          </h1>
          <span className="text-sm text-gray-400">
            {getOnlineUsersStatus(selectedConversation._id)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Chatuser;
