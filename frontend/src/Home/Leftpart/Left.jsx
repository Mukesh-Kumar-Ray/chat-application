import React from 'react'
import Logout from "./Logout"
import User from "./Users"
import Search from "./Search"
const Left = () => {
  return (
    <div className="w-[30%]   bg-black text-gray-300">
      <Search/>
      
      <div
        className=" flex-1 overflow-y-auto"
        style={{ minHeight: "calc(84vh - 10vh)" }}
        >
        <User/>
      </div>

      <Logout/>
      
    </div>
  )
}

export default Left