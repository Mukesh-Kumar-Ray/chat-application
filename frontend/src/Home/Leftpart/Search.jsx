import React,{useState} from 'react'
import { FaSearch } from "react-icons/fa";
import useGetAllUsers from "../../Context/useGetAllUsers.jsx";
import useConversation from "../../../zustand/useConversation.js";

function Search() {
  const [search, setSearch] = useState("");
  const [allUsers] = useGetAllUsers();
  const { setSelectedConversation } = useConversation();
  console.log(allUsers);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    const conversation = allUsers.find((user) =>
      user.fullname?.toLowerCase().includes(search.toLowerCase())
    );
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      console.log(error)
    }
  };
  return (
    <div className="h-[10vh] flex items-center justify-center bg-transparent">
  <div className="w-full max-w-lg px-4">
    <form onSubmit={handleSubmit}>
      <div className="flex items-center space-x-3">
        {/* Search Input */}
        <label className="flex items-center w-full gap-2 border border-gray-700 bg-slate-900 rounded-lg px-4 py-2 focus-within:border-blue-500">
          <FaSearch className="text-gray-400 text-lg" />
          <input
            type="text"
            className="w-full bg-transparent outline-none text-white placeholder-gray-500"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
        
        {/* Search Button */}
        <button
          type="submit"
          className="flex items-center justify-center text-white bg-blue-600 hover:bg-blue-700 duration-300 rounded-lg p-3 shadow-md"
          aria-label="Search"
        >
          <FaSearch className="text-2xl" />
        </button>
      </div>
    </form>
  </div>
</div>

  )
}

export default Search