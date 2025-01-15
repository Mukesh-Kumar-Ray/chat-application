import React ,{useState}from 'react'
import { BiLogOutCircle } from "react-icons/bi";
import axios from "axios";
import Cookies from "js-cookie";


function Logout() {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/user/Logout");
      localStorage.removeItem("ChatApp");
      Cookies.remove("jwt");
      setLoading(false);
      
      window.location.reload();
    } catch (error) {
      console.log("Error in Logout", error);
     
    }
  };
  return (
    <>
      <hr />
      <div className=" h-[10vh] bg-transparent">
        <div>
          <BiLogOutCircle
            className="text-5xl text-white hover:bg-slate-700 duration-300 cursor-pointer rounded-full p-2 ml-2 mt-1"
            onClick={handleLogout}
          />
        </div>
      </div>
    </>
  )
}

export default Logout