import React from 'react'
import User from "./User"
import useGetAllUsers from "../../Context/useGetAllUsers"
function Users() {
  //console.log("mukesh")
  const [allUsers,loading] = useGetAllUsers();
    //console.log(allUsers);
  return (
    <section className="bg-slate-900 rounded-md shadow-md">
  {/* Header */}
  <header className="px-6 py-2 bg-slate-800 text-white font-semibold rounded-t-md">
    Messages
  </header>

  {/* User List */}
    
  <div
    className="py-2 flex-1 overflow-y-auto custom-scrollbar"
    style={{ maxHeight: "calc(84vh - 10vh)" }}
  >
    {
      allUsers.map((item,index)=>(
        <User key={index} ele={item} />
      )   
      )
    }
  </div>
</section>

  )
}

export default Users