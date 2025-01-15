import React from "react";
import useConversation from "../../../zustand/useConversation.js";
import { useSocketContext } from "../../Context/SocketContext.jsx";

function User({ ele }) {
  //console.log({ele});
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === ele._id;
  const { socket, onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(ele._id);

  //console.log(isOnline);
  return (
    <div
      className={`hover:bg-slate-600 duration-300 ${
        isSelected ? "bg-slate-700" : ""
      }`}
      onClick={() => setSelectedConversation(ele)}
    >
      <div className="hover:bg-slate-700 transition duration-300 cursor-pointer rounded-lg">
        <div className="flex items-center space-x-4 px-6 py-4">
          {/* Avatar Section */}

          <div
            className={
              isOnline
                ? `w-14 h-14 rounded-full overflow-hidden bg-gray-800 ring-2 ring-green-500`
                : `w-14 h-14 rounded-full overflow-hidden bg-gray-800 ring-2 ring-red-500`
            }
          >
            <img
              src="https://via.placeholder.com/56" // Add actual image source here
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>

          {/* User Details */}
          <div>
            <h1 className="text-lg font-semibold text-white">{ele.fullname}</h1>
            <span className="text-sm text-gray-400">{ele.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
